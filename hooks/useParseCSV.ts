import { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface ParsedData {
    [key: string]: any;
}

const useParseCSV = (ticketHistory: string | null) => {
    const [parsedData, setParsedData] = useState<ParsedData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (ticketHistory) {
            Papa.parse(ticketHistory, {
                header: true,
                complete: (results) => {
                    setParsedData(results.data as ParsedData[]);
                    setLoading(false);
                },
                error: (err: any) => {
                    setError(err);
                    setLoading(false);
                }
            });
        }
    }, [ticketHistory]);

    return { parsedData, loading, error };
};

export default useParseCSV;