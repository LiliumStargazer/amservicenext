import { useCallback } from 'react';
import useStore from "@/app/store";
import { validateSerial, handleDownload } from "@/lib/backupHandler";
import * as Sentry from "@sentry/nextjs";

interface Router {
    push: (url: string) => void;
}

function useDownloadBackupOnClick(router: Router) {
    const serial = useStore(state => state.serial);
    const setMessage = useStore(state => state.setMessage);
    const setSerial = useStore(state => state.setSerial);
    const setLoading = useStore(state => state.setLoading);
    const setPage = useStore(state => state.setPage);

    return useCallback(async () => {
        let isValid = validateSerial(serial);

        if (isValid) {
            setLoading(true);
            setPage("Master");
            router.push("/amservice");
            try {
                await handleDownload(serial );
            } catch (error) {
                console.error("sono error in useDownloadBackupOnClick", error);
                setMessage(`${error}`);
                Sentry.captureException(error);
            } finally {
                setLoading(false);
            }
        }
    }, [serial, setMessage, setSerial, setLoading, setPage, router]);
}

export default useDownloadBackupOnClick;