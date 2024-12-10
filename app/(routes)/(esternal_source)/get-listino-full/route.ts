'use server'

import axios from 'axios';
import { Buffer } from 'buffer';
import { NextResponse } from 'next/server';
import {logErrorAndRespond} from "@/app/lib/error-handler";

const gwName = "ProdottiFisiciService";
const gwPwd = "PF@18TylS?V2";

const clientId = "7ab4d3a0-0f77-47e7-acfb-6157f56b0908";
const clientSecret = "f0e6c825-b954-4b41-9ac0-8e01729235bb";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const serial = searchParams.get('serial');
    const settore = "TABACCO"
    const result ={
        prodV: '',
        items: [],
    }

    try {
        const url = `https://dashboard.amdistributori.it/rest/am/gateway/listino-prodotti-fisici/v7/getListinoFull?serialNumber=${serial}&settore=${settore}&withobso=${false}`;
        const auth = Buffer.from(`${gwName}:${gwPwd}`).toString('base64');

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'client_id': clientId,
                'client_secret': clientSecret,
                'Accept': 'application/vnd.api+json'
            }
        });

        if (response && response.status === 200 && response.data) {
            const listino = response.data;
            if (listino) {
                result.prodV = new Date(listino.version).toLocaleString('it-IT', { timeZone: 'UTC' });
                result.items = listino.physicalProducts.physicalProduct;
            }
        }

        return NextResponse.json(result);
    } catch (error) {
        return logErrorAndRespond(error);
    }
}

// Path: app/api/srv-alive-alive-events/route.ts