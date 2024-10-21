import { useEffect, useState } from "react";
import Papa from "papaparse";

interface ParsedData {
    [key: string]: any;
}

const useParseCSV = (csvString: any) => {
    const [parsedData, setParsedData] = useState<ParsedData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const parseCSV = () => {
            try {
                if (csvString && csvString.length > 0) {
                    Papa.parse(csvString, {
                        header: true,
                        delimiter: ";",
                        complete: (results) => {
                            setParsedData(results.data as ParsedData[]);
                            setLoading(false);
                        },
                        error: (err: any) => {
                            setError(err);
                            setLoading(false);
                        }
                    });
                } else {
                    setLoading(false);
                }
            } catch (e) {
                console.error("Error during CSV parsing:", e);
                setError(e as Error);
                setLoading(false);
            }
        };

        parseCSV();
    }, [csvString]);

    return { parsedData, loading, error };
};

export default useParseCSV;