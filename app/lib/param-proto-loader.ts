import path from 'path';
import protobuf from 'protobufjs';

import { RawParams } from "@/app/types/types";
import fs from 'fs';

let TCoreParam: protobuf.Type;
let TCoreParamCE: protobuf.Type;

//provvisorio


const loadProtoFile = (protoPath: string): Promise<protobuf.Root> => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(protoPath) || fs.lstatSync(protoPath).isDirectory()) {
            const error = new Error(`Invalid path: ${protoPath}`);
            reject(error);
            return;
        }
        protobuf.load(protoPath, (err, root) => {
            if (err) {
                reject(err);
            } else if (!root) {
                const error = new Error(`Root is undefined for ${protoPath}`);
                reject(error);
            } else {
                resolve(root);
            }
        });
    });
};

//disabilitato temporaneamente
// const loadProtoAndroid = loadProtoFile(path.resolve(process.env.PROTO_PATH_ANDROID || ''));
// const loadProtoCE = loadProtoFile(path.resolve(process.env.PROTO_PATH_CE || ''));
// const loadProtoAndroid = loadProtoFile(path.resolve("./app/lib/params/TCoreParam.proto"));
// const loadProtoCE = loadProtoFile(path.resolve("./app/lib/params/param.proto"));
const protoPathAndroid = process.env.PROTO_PATH_ANDROID || '';
const protoPathCE = process.env.PROTO_PATH_CE || '';

const loadProtoAndroid = loadProtoFile(path.resolve(protoPathAndroid));
const loadProtoCE = loadProtoFile(path.resolve(protoPathCE));

export async function getParams(data: RawParams[], softwareType: 'android' | 'windows'): Promise<protobuf.Message<Record<string, unknown>>> {
    try {
        if (softwareType === 'android') {
            const root = await loadProtoAndroid;
            TCoreParam = root.lookupType("TCoreParam");
            return TCoreParam.decode(data[0].Data);
        } else {
            const root = await loadProtoCE;
            TCoreParamCE = root.lookupType("TCoreParam");
            return TCoreParamCE.decode(data[0].Data);
        }
    } catch (e) {
        throw e;
    }
}