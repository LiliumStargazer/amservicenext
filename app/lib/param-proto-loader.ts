import path from 'path';
import protobuf from 'protobufjs';
import * as Sentry from '@sentry/nextjs';
import {RawParams} from "@/app/types/types";

let TCoreParam: protobuf.Type;
let TCoreParamCE: protobuf.Type;


const loadProtoAndroid = new Promise<void>((resolve, reject) => {
    const protoPath = path.resolve('./app/lib/params/TCoreParam.proto');
    protobuf.load(protoPath, (err, root) => {
        if (err) {
            Sentry.captureException(err);
            reject(err);
        } else {
            if (!root) {
                const error = new Error('Root è undefined per TCoreParam.proto');
                Sentry.captureException(error);
                reject(error);
            } else {
                TCoreParam = root.lookupType("TCoreParam");
                resolve();
            }
        }
    });
});

const loadProtoCE = new Promise<void>((resolve, reject) => {
    const protoPath = path.resolve('./app/lib/params/param.proto');
    protobuf.load(protoPath, (err, root) => {
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

export async function getParams(data: RawParams[], softwareType: 'android' | 'windows'): Promise<protobuf.Message<Record<string, unknown>>> {
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
