import crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';

// Interfacce per i tipi di risposta
interface VTEChallengeResponse {
    success: boolean;
    result: {
        token: string;
        serverTime: number;
        expireTime: number;
    };
}

interface VTELoginResponse {
    success: boolean;
    result: {
        sessionName: string;
        userId: string;
        version: string;
        vtigerVersion: string;
        timezone: number;
    };
}

interface VTEAssetResponse {
    success: boolean;
    result: {
        id: string;
        account: string;
        data_collaudo: string;
        collaudatore: string;
        bill_street?: string;
        bill_city?: string;
        bill_code?: string;
        bill_state?: string;
        accountname?: string;
        [key: string]: unknown; // Per proprietà aggiuntive
    };
}

interface VTEEntityResponse {
    success: boolean;
    result: {
        accountname: string;
        bill_street: string;
        bill_city: string;
        bill_code: string;
        bill_state: string;
        [key: string]: unknown;
    };
}

interface VTELogin {
    lastResp: VTELoginResponse;
    lastLoginDate: number;
    serverLoginValidityMinutes: number;
}

interface VteUtility {
    AssetUrl: string;
    AccountName: string;
    BillStreet: string;
    BillCity: string;
    BillCode: string;
    BillState: string;
    DataCollaudo: string;
    Collaudatore: string;
}

export class Vtiger {
    private readonly VTE_URL = process.env.VTE_URL;
    private readonly VTE_USERNAME = process.env.VTE_USERNAME;
    private readonly VTE_ACCESSKEY = process.env.VTE_ACCESSKEY;
    private readonly VTE_ASSET_URL = process.env.VTE_ASSET_URL;

    private lastLogin: VTELogin | null = null;
    public vteUtility: VteUtility = {
        AssetUrl: '',
        AccountName: '',
        BillStreet: '',
        BillCity: '',
        BillCode: '',
        BillState: '',
        DataCollaudo: '',
        Collaudatore: ''
    };

    private async getMd5Hash(input: string): Promise<string> {
        return crypto.createHash('md5').update(input).digest('hex');
    }

    private async doVteLogin(): Promise<VTELogin | null> {
        const now = Date.now();

        if (this.lastLogin &&
            (now - this.lastLogin.lastLoginDate) < (this.lastLogin.serverLoginValidityMinutes * 60 * 1000)) {
            return this.lastLogin;
        }

        // Step 1: Get Challenge
        const challengeUrl = `${this.VTE_URL}getchallenge&username=${this.VTE_USERNAME}`;
        const challengeResponse: AxiosResponse<VTEChallengeResponse> = await axios.get(challengeUrl);

        if (!challengeResponse.data.success) return null;

        // Step 2: Create MD5 Hash
        const md5Hash = await this.getMd5Hash(challengeResponse.data.result.token + this.VTE_ACCESSKEY);

        // Step 3: Login
        const loginUrl = `${this.VTE_URL}login`;

        if (!this.VTE_USERNAME || !this.VTE_ACCESSKEY) {
            return null;
        }

        const loginParams = new URLSearchParams({
            username: this.VTE_USERNAME,
            accessKey: md5Hash
        });

        const loginResponse: AxiosResponse<VTELoginResponse> = await axios.post(loginUrl, loginParams);
        if (!loginResponse.data.success) return null;

        this.lastLogin = {
            lastResp: loginResponse.data,
            lastLoginDate: Date.now(),
            serverLoginValidityMinutes: Math.floor(
                (challengeResponse.data.result.expireTime - challengeResponse.data.result.serverTime) / 60
            )
        };

        return this.lastLogin;
    }

    private async getEntity(accountId: string, sessionName: string): Promise<VTEEntityResponse> {
        const entityUrl = `${this.VTE_URL}retrieve&sessionName=${sessionName}&id=${accountId}`;
        const response = await axios.get<VTEEntityResponse>(entityUrl);
        return response.data;
    }

    private async getAsset(sessionName: string, serialNumber: string): Promise<VTEAssetResponse> {
        const assetUrl = `${this.VTE_URL}getAssetBySn`;
        const params = new URLSearchParams({
            sessionName: sessionName,
            serialnumber: serialNumber
        });

        const response = await axios.post<VTEAssetResponse>(assetUrl, params);
        return response.data;
    }

    public async getVteInfo(matricola: string): Promise<number> {
        try {
            const login = await this.doVteLogin();
            if (!login) return 1;

            const sessionName = login.lastResp.result.sessionName;

            // Get Asset
            const assetResponse = await this.getAsset(sessionName, matricola);
            if (!assetResponse.success) return 1;

            // Update Utility
            const assetId = assetResponse.result.id;
            this.vteUtility.AssetUrl = this.VTE_ASSET_URL + assetId.split('x')[1];

            // Get Entity
            const entityResponse = await this.getEntity(assetResponse.result.account, sessionName);
            if (!entityResponse.success) return 1;

            // Populate utility
            this.vteUtility = {
                ...this.vteUtility,
                AccountName: entityResponse.result.accountname || '',
                BillStreet: entityResponse.result.bill_street || '',
                BillCity: entityResponse.result.bill_city || '',
                BillCode: entityResponse.result.bill_code || '',
                BillState: entityResponse.result.bill_state || '',
                DataCollaudo: assetResponse.result.data_collaudo || '',
                Collaudatore: assetResponse.result.collaudatore || ''
            };

            return 0;
        } catch (error) {
            console.error('Error in getVteInfo:', error);
            return 1;
        }
    }
}
