import {useQueryVte} from "@/app/hooks/useQueryVte";
import React, {useEffect} from "react";


export const useVteData = (serial: string) => {
    console.log('serial', serial);

    const { data, isSuccess} = useQueryVte(serial);
    const [customerName, setCustomerName] = React.useState<string>('');
    const [VTElink, setVTElink] = React.useState<string>('');

    useEffect(() => {
        if (isSuccess && data ) {
            const response = data as { AccountName: string , AssetUrl: string};
            setCustomerName(response.AccountName);
            setVTElink(response.AssetUrl);
        }

    }, [data, isSuccess]);

    console.log(VTElink, customerName);

    return {customerName, VTElink};
}