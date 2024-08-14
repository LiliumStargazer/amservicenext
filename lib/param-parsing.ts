import protobuf from 'protobufjs';
import * as Sentry from '@sentry/nextjs';

let TCoreParam: protobuf.Type;
let TCoreParamCE: protobuf.Type;

const loadProtoAndroid = new Promise<void>((resolve, reject) => {
    protobuf.load('./params/TCoreParam.proto', (err, root) => {
        if (err) {
            Sentry.captureException(err);
            reject(err);
        } else {
            if (!root) {
                const error = new Error('Root è undefined per TCoreParam.proto');
                Sentry.captureException(error);
                reject(error);
            }
            else
                TCoreParam = root.lookupType("TCoreParam");
                resolve();
        }
    });
});

const loadProtoCE = new Promise<void>((resolve, reject) => {
    protobuf.load('./params/param.proto', (err, root) => {
        if (err) {
            Sentry.captureException(err);
            reject(err);
        } else if (!root) {
            const error = new Error('Root è undefined per params.proto');
            Sentry.captureException(error);
            reject(error);
        } else {
            TCoreParamCE = root.lookupType("TCoreParam");
            resolve();
        }
    });
});

interface Data {
    Data: Uint8Array;
}

async function getParams(data: Data[], softwareType: 'android' | 'ce'): Promise<protobuf.Message<{}>> {
    try {
        if (softwareType === 'android') {
            await loadProtoAndroid;
            return TCoreParam.decode(data[0].Data);
        } else {
            await loadProtoCE;
            return TCoreParamCE.decode(data[0].Data);
        }
    } catch (e) {
        Sentry.captureException(e);
        throw e;
    }
}

export { getParams };