const protobuf = require('protobufjs');

let TCoreParam;
const loadProto = new Promise((resolve, reject) => {
    protobuf.load("lib/params/TCoreParam.proto", function(err, root) {
        if (err) reject(err);
        TCoreParam = root.lookupType("TCoreParam");
        resolve();
    });
});

async function getParams(data) {
    try {
        await loadProto;
        return TCoreParam.decode(data[0].Data);
    } catch (e) {
        console.error('Errore durante la deserializzazione dei parametri:', e);
        return null;
    }
}

module.exports = { getParams };
