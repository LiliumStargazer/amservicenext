import { convertToDevType, convertToErogResult, convertToFase, convertToMotMoveRequest, convertToState, eventsColors}
    from "./events-helper";
import ButtonDialog from "@/components/button-dialog";
import React from "react";
import {formatStringToDate} from "@/lib/utils";

export function mapLogDaMaster(logDaMaster, isConverted = true) {
    return logDaMaster.map((row, rowIndex) => {
        let formattedDate;
        let convertedState;
        let convertedT1;
        let convertedT2;
        let convertedT4;
        let convertedTagData;
        let convertedDevType;
        let convertedFase;
        let time;
        let result;
        let devProducer;
        let DevId;

        if (!isConverted){
            formattedDate = formatStringToDate(row.DataOraR);
            convertedState = convertToState(parseInt(row.State));
            DevId = row.DevId ? row.DevId : undefined;
            devProducer = row.DevProducer ? row.DevProducer : DevId;
            convertedDevType = convertToDevType(parseInt(devProducer));
            convertedFase = convertToFase(parseInt(row.Fase));
            convertedT1 = convertT1(row.EventString, row.Tag1);
            convertedT2 = convertT2(row.EventString, row.Tag2);
            convertedT4 = convertT4(row.EventString, row.Tag4);
            convertedTagData = convertTagData(row.EventString, row.TagData,
                row.Tag1, row.Tag2, row.Tag3);
            time = row.DataOraR.slice(11);

            result = {
                IDR: rowIndex,
                DataOraR: formattedDate,
                EventString: row.EventString,
                State: convertedState,
                DevProducer: convertedDevType,
                DevIndex: row.DevIndex ? row.DevIndex : row.RelIndex,
                SubIndex: row.SubIndex,
                DevClass: row.DevClass,
                Tag1: convertedT1,
                Tag2: convertedT2,
                Tag3: row.Tag3,
                Tag4: convertedT4.value,
                Fase: convertedFase,
                TagData: convertedTagData,
                Time: time
            };
        }
        else{
            result = {
                IDR: row.IDR,
                DataOraR: row.DataOraR,
                EventString: row.EventString,
                State: row.State,
                DevProducer: row.DevProducer,
                DevIndex: row.DevIndex,
                SubIndex: row.SubIndex,
                DevClass: row.DevClass,
                Tag1: row.Tag1,
                Tag2: row.Tag2,
                Tag3: row.Tag3,
                Tag4: row.Tag4,
                Fase: row.Fase,
                TagData: row.TagData,
                Time: row.Time
            }
        }

        return result;
    });
}


export const getRowColorClass = (cell) => {
    for (const value in eventsColors) {
        if (cell.includes(value)) {
            return eventsColors[value];
        }
    }
    return "";
};

export const getRowStyle = (params) => {
    const color = getRowColorClass(params.data.EventString)
    if ( color !== "")
        return {backgroundColor: color , fontWeight: 'bold'};
}

export function convertTagData(event, tagData, tag1, tag2, tag3){
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

export function convertT1(event, tag){
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

export function convertT2(event, tag){
    if (event.includes("EV_V2_SAMEBNK") || event.includes("EV_V2_BNKREC") )
        return (parseInt(tag) / 100).toFixed(2).toString().concat( " €");
    return tag.toString();
}

export function convertT4(event, tag){
    if (event.includes("PAYMENT")){
        return {value: (parseInt(tag) / 100).toFixed(2).toString().concat("€ ") };
    }
    return { value: tag.toString() };
}

export function tagDataCellRenderer(props) {

    const textValue = props.data.EventString;
    if ( textValue.includes("EV_PAX_PAYMENT") || textValue.includes("EV_ING_PAYMENT")
        || textValue.includes("EV_MRPAY_EXECUTERECHARGE")
        || textValue.includes("EV_SWEXC") )  {

        return <ButtonDialog rowEvent={props.value } type={"tagdata"} />;
    }
    else {
        return <span>{props.value}</span>;
    }
}

export const filterParams  = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        const dateAsString = cellValue;

        if (dateAsString == null) {
            return 0;
        }
        const dateParts = dateAsString.split('/');
        const year = Number(dateParts[2]);
        const month = Number(dateParts[1]) - 1;
        const day = Number(dateParts[0]);
        const cellDate = new Date(year, month, day );

        if (cellDate < filterLocalDateAtMidnight) {
            return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
        }
        return 0;
    },

    minValidYear: 2000,
    maxValidYear: 2035,
    inRangeFloatingFilterDateFormat: "Do MMM YYYY",
}

export  const defaultColDef = {
    flex: 1,
    floatingFilter: true,
    suppressFloatingFilterButton: true,
};