import {getFrigoBackup} from "../../../lib/apiClient";

export async function getLogFrigo(context) {
    const { serialTyped, backupSelected, setMessage, setLoading, logDaMaster, setFrigoData} = context;

    setLoading(true);

    try{
        if (logDaMaster.length === 0){
            setLoading(false);
            setMessage('Download backup Master first');
            return false;
        }
        const result = await getFrigoBackup(serialTyped, backupSelected)
        if (result.length === 0){
            setLoading(false);
            setMessage('No data found');
            return false;
        }
        setFrigoData(result);
        setLoading(false);
        return true;
    }catch (e) {
        setLoading(false);
        setMessage(`${e}`);
        return false;
    }
}