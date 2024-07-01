import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useParseCSV = (ticketHistory) => {
    const [parsedData, setParsedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (ticketHistory) {
            Papa.parse(ticketHistory, {
                header: true,
                complete: (results) => {
                    setParsedData(results.data);
                    setLoading(false);
                },
                error: (err) => {
                    setError(err);
                    setLoading(false);
                }
            });
        }
    }, [ticketHistory]);

    return { parsedData, loading, error };
};

export default useParseCSV;