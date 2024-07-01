import { useCallback, useContext } from 'react';
import { Context } from "@/app/Context";
import { validateSerial, handleDownload } from "@/lib/backup-handler";
import * as Sentry from "@sentry/nextjs";

function useDownloadBackupOnClick(router) {
    const context = useContext(Context);
    const { serial, setMessage, setSerial, setLoading, setPage } = context;

    return useCallback(async () => {

        let isValid = validateSerial(serial, setMessage, setSerial);

        if (isValid) {
            setLoading(true);
            setPage("Master");
            router.push("/amservice");
            try {
                await handleDownload(serial, context);
            } catch (error) {
                console.error("sono error in useDownloadBackupOnClick", error);
                setMessage(`${error}`);
                Sentry.captureException(error);
            } finally {
                setLoading(false);
            }
        }
    }, [serial, context, router, setMessage, setLoading, setPage, setSerial]);
}

export default useDownloadBackupOnClick;