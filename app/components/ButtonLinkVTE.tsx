'use client'
import React, {useEffect} from 'react';
import {apiGetVteData} from "@/app/lib/apiGET";

interface MasterButtonProps {
    serial: string;
}

const ButtonLinkVTE: React.FC<MasterButtonProps> = ({ serial }) => {
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState<string | null>(null);
    const [link, setLink] = React.useState<string | null>('');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await apiGetVteData(serial) as { AccountName: string , AssetUrl: string};
                setName(response.AccountName);
                setLink(response.AssetUrl);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData().catch();
    }, [serial]);

    if (loading) {
        return <div className="skeleton h-9 w-32"></div>;
    }

    if (!name) {
        return ;
    }

    return <button className="btn btn-link" onClick={() => link && window.open(link, '_blank')}>{name}</button>;
};

export default ButtonLinkVTE;