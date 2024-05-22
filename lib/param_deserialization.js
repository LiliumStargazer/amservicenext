const protobuf = require('protobufjs');
const protobufCE = require('protobufjs');

let TCoreParam;
let TCoreParamCE;

const loadProtoAndroid = new Promise((resolve, reject) => {
     protobuf.load('./params/TCoreParam.proto', function(err, root) {
        if (err) reject(err);
        TCoreParam = root.lookupType("TCoreParam");
        resolve();
    });
});

const loadProtoCE = new Promise((resolve, reject) => {
    protobufCE.load('./params/param.proto', function(err, root) {
        if (err) {
            reject(err);
            throw new Error('Errore durante il caricamento del file param.proto: ' + err.message);
        } else if (!root) {
            reject(new Error('Root è undefined per param.proto'));
            throw error;
        } else {
            console.log('Il file param.proto è stato caricato correttamente');
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
        console.error('Errore durante la deserializzazione dei parametri:', e);
        throw e;
    }
}

module.exports = { getParams };
