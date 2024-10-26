// utils/handleTagData.ts

export const handleTagData = (
    event: any,
    setIsDialogOpen: (value: boolean) => void,
    setDialogContent: (value: any[]) => void
) => {
    if (event.colDef.field === 'TagData') {
        const textValue = event.data.EventString;
        if (
            textValue.includes("EV_PAX_PAYMENT") ||
            textValue.includes("EV_ING_PAYMENT") ||
            textValue.includes("EV_MRPAY_EXECUTERECHARGE") ||
            textValue.includes("EV_SWEXC")
        ) {
            setIsDialogOpen(true);
            setDialogContent(event.data.TagData);
        }
    }
};