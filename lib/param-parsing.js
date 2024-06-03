const protobuf = require('protobufjs');
const protobufCE = require('protobufjs');
const Sentry = require('@sentry/nextjs');

let TCoreParam;
let TCoreParamCE;

const loadProtoAndroid = new Promise((resolve, reject) => {
     protobuf.load('./params/TCoreParam.proto', function(err, root) {
        if (err){
            Sentry.captureException(err);
            reject(err);
        }
        TCoreParam = root.lookupType("TCoreParam");
        resolve();
    });
});

const loadProtoCE = new Promise((resolve, reject) => {
    protobufCE.load('./params/param.proto', function(err, root) {
        if (err) {
            Sentry.captureException(err);
            reject(err);
            throw new Error('Errore durante il caricamento del file param.proto: ' + err.message);
        } else if (!root) {
            reject(new Error('Root è undefined per param.proto'));
            throw error;
        } else {
            TCoreParamCE = root.lookupType("TCoreParam");
            resolve();
        }
    });
});

async function getParams(data, softwareType) {
    try {
        if ( softwareType === 'android'){
            await loadProtoAndroid;
            return TCoreParam.decode(data[0].Data);
        }
        else{
            await loadProtoCE;
            return TCoreParamCE.decode(data[0].Data);
        }
    } catch (e) {
        Sentry.captureException(e);
        throw e;
    }
}

module.exports = { getParams };

