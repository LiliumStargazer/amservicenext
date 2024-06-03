import { useState, useEffect } from 'react';

function useFetchData(fetchFunction, successCallback) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await fetchFunction();
            if (result) {
                successCallback(result);
            } else {
                throw new Error('No data found');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchFunction, successCallback]);

    return { loading, error };
}

export default useFetchData;