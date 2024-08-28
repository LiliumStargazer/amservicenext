import { useCallback } from 'react';
import useStore from "@/app/store";
import { validateSerialAndSetAlert, handleDownload } from "@/features/shared/client/utils/backup-handler";
import * as Sentry from "@sentry/nextjs";

interface Router {
    push: (url: string) => void;
}

function useDownloadBackupOnClick(router: Router) {

    const serial = useStore(state => state.serial);
    const setMessage = useStore(state => state.setMessage);
    const setSerial = useStore(state => state.setSerial);
    const setLoading = useStore(state => state.setLoading);
    const setTable = useStore(state => state.setTable);

    return useCallback(async () => {
        if (serial === "")
            return setMessage("Please type a serial number");
        setLoading(true);
        setTable("master");
        router.push("/log");
        let isValid = validateSerialAndSetAlert(serial);
        if (isValid) {
            setLoading(true);
            try {
                await handleDownload(serial);
            } catch (error) {
                setMessage(`${error}`);
                Sentry.captureException(error);
            } finally {
                setLoading(false);
            }
        }
    }, [serial, setMessage, setSerial, setLoading, setTable, router]);
}

export default useDownloadBackupOnClick;