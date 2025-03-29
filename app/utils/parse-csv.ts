import Papa from "papaparse";
import { Ticket} from "@/app/types/types";

const parseCsv = (csvString: string): Promise<Ticket[]> => {
    return new Promise((resolve, ) => {
        if (csvString && csvString.length > 0) {
            Papa.parse(csvString, {
                header: true,
                delimiter: ";",
                complete: (results) => {
                    resolve(results.data as Ticket[]);
                },
            });
        } else {
            resolve([]);
        }
    });
};

export default parseCsv;