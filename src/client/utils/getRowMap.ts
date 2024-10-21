// /features/log/client/components/tables/getRowMap";


import { formatStringDateOrder } from "@/src/client/utils/utils";
import { convertToState, convertToDevType, convertToFase, eventsColors, convertToErogResult, convertToMotMoveRequest
} from "@/src/client/utils/eventMapping";

const getRowColorClass = (cell: string): string => {
    for (const value in eventsColors) {
        if (cell.includes(value)) {
            return eventsColors[value];
        }
    }
    return "";
};

function convertTagData(event: string, tagData: string, tag1: string, tag2: string, tag3: string): string {
    if (event.includes("EV_CARD_CICLO_OK_ETA")) {
        return tagData.toString().concat(" data di nascita: ", tag1, "/", tag2, "/", tag3);
    }
    if (event.includes("ENDMOVE")) {
        let toErogResult = convertToErogResult(Number(tag1));
        if (toErogResult.includes("InExecution")) toErogResult = "";
        return convertToMotMoveRequest(Number(tag2)).concat(" ", toErogResult);
    }

    if (!tagData) return "";
    return tagData.toString();
}

function convertT1(event: string, tag: string): string {
    if (event.includes("EV_BNK_IN") || event.includes("EV_BNK_ESCROW"))
        return (parseInt(tag) / 100).toFixed(2).toString().concat(" €");
    if (event.includes("EV_COIN_IN")) {
        let parseCent = parseInt(tag) / 100;
        if (parseCent >= 1) {
            return parseCent.toFixed(2).toString().concat(" €");
        } else {
            return tag.toString().concat(" Cent");
        }
    }
    return tag.toString();
}

export function convertT2(event: string, tag: string): string {
    if (event.includes("EV_V2_SAMEBNK") || event.includes("EV_V2_BNKREC"))
        return (parseInt(tag) / 100).toFixed(2).toString().concat(" €");
    return tag.toString();
}

export function convertT4(event: string, tag: string): { value: string } {
    if (event.includes("PAYMENT")) {
        return { value: (parseInt(tag) / 100).toFixed(2).toString().concat("€ ") };
    }
    return { value: tag.toString() };
}

export const getRowsMap = (backupData: any) => {
    return backupData.map((value: any, rowIndex: number) => ({
        IDR: rowIndex,
        DataOraR: formatStringDateOrder(value.DataOraR),
        EventString: value.EventString,
        State: convertToState(parseInt(value.State)),
        DevProducer: convertToDevType(parseInt(value.DevProducer ? value.DevProducer : value.DevId)),
        DevIndex: value.DevIndex ? value.DevIndex : value.RelIndex,
        SubIndex: value.SubIndex,
        DevClass: value.DevClass,
        Tag1: convertT1(value.EventString, value.Tag1),
        Tag2: convertT2(value.EventString, value.Tag2),
        Tag3: value.Tag3,
        Tag4: convertT4(value.EventString, value.Tag4).value,
        Fase: convertToFase(parseInt(value.Fase)),
        TagData: convertTagData(value.EventString, value.TagData, value.Tag1, value.Tag2, value.Tag3),
        Time: value.DataOraR.slice(11),
        rowColor: getRowColorClass(value.EventString),
    }));
};