import {getParamApi} from "../../../lib/apiClient";


export async function getParam(context) {
    const { serialTyped, backupSelected, setMessage, setLoading, logDaMaster, setParam} = context;

    setLoading(true);

    try{
        if (logDaMaster.length === 0){
            setLoading(false);
            setMessage('Download backup Master first');
            return false;
        }
        const result = await getParamApi(serialTyped, backupSelected)
        if (result.length === 0){
            setLoading(false);
            setMessage('No data found');
            return false;
        }
        setParam(result);
        setLoading(false);
        return true;
    }catch (e) {
        setLoading(false);
        setMessage(`${e}`);
        return false;
    }
}