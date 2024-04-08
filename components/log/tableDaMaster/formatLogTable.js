import valueToColor from "./valueToColor";
import { convertToErogResult, convertToMotMoveRequest} from "./states";

function formatStringData(stringaInput) {
    let dataInput = new Date(stringaInput);
    let giorno = dataInput.getDate();
    let mese = dataInput.getMonth() + 1;
    let anno = dataInput.getFullYear();
    return giorno + '/' + mese + '/' + anno;
}

const getRowColorClass = (cell) => {
    for (const value in valueToColor) {
        if (cell.includes(value)) {
            return valueToColor[value];
        }
    }
    return "";
};

const getRowStyle = (params) => {
    const color = getRowColorClass(params.data.EventString)
    if ( color === "")
        return {fontSize: '12px' };
    else
        return { backgroundColor: color , fontWeight: 'bold', fontSize: '14px'};
}

function convertTagData(event, tagData, tag1, tag2, tag3){
    if (event.includes("EV_CARD_CICLO_OK_ETA")) {
        return tagData.toString().concat( " data di nascita: ", tag1, "/", tag2,"/", tag3)  ;
    }
    if (event.includes("ENDMOVE")){
        let toErogResult = convertToErogResult(tag1).toString();
        if (toErogResult.includes("InExecution"))
            toErogResult = "";
        return convertToMotMoveRequest(tag2).toString().concat(" ", toErogResult );
    }


    if (!tagData)
        return "";
    return tagData.toString();
}

function convertT1(event, tag){
    if (event.includes("EV_BNK_IN") || event.includes("EV_BNK_ESCROW") )
        return  (parseInt(tag) / 100).toFixed(2).toString().concat( " €");
    if (event.includes( "EV_COIN_IN") ) {
        let parseCent = parseInt(tag) / 100;
        if (parseCent >= 1) {
            return  parseCent.toFixed(2).toString().concat(" €") ;
        }
        else {
            return  tag.toString().concat(" Cent");
        }
    }
    return tag.toString();
}

function convertT2(event, tag){
    if (event.includes("EV_V2_SAMEBNK") )
        return (parseInt(tag) / 100).toFixed(2).toString().concat( " €");
    return tag.toString();
}

function convertT4(event, tag){
    if (event.includes("PAYMENT")){
        return {value: (parseInt(tag) / 100).toFixed(2).toString().concat("€ ") };
    }
    return { value: tag.toString() };
}



export {getRowColorClass, getRowStyle, formatStringData, convertT1,convertT2, convertT4, convertTagData};
