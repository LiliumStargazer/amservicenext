import React, {ReactNode, useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import useStore from "@/app/store";

interface DialogContent {
    EventCode: string;
    EventString: string;
    EventTrad: string;
    Tag1Trad: string;
    Tag2Trad: string;
    Tag3Trad: string;
    Tag4Trad: string;
    TagDataTrad: string;
}

const dialogId = uuidv4();

const Dialog: React.FC = () => {
    const isDialogOpen = useStore(state => state.isDialogOpen);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const dialogContent = useStore(state => state.dialogContent);
    const [box, setDialogBox] = useState<ReactNode | null>(null);
    function onClickClose() {
        setIsDialogOpen(false);
    }


    useEffect(() => {
        if (typeof dialogContent === 'object' && dialogContent !== null && !Array.isArray(dialogContent)) {
            const content = dialogContent as DialogContent;
            const boxTemp = (
                <>
                    <h1 className="text-primary">Code:</h1><p>{content.EventCode}</p>
                    <h1 className="text-primary">Event:</h1><p>{content.EventString}</p>
                    <h1 className="text-primary">Translation:</h1><p>{content.EventTrad}</p>
                    <h1 className="text-primary">Tag1:</h1><p>{content.Tag1Trad}</p>
                    <h1 className="text-primary">Tag2:</h1><p>{content.Tag2Trad}</p>
                    <h1 className="text-primary">Tag3:</h1><p>{content.Tag3Trad}</p>
                    <h1 className="text-primary">Tag4:</h1><p>{content.Tag4Trad}</p>
                    <h1 className="text-primary">TagData:</h1><p>{content.TagDataTrad}</p>
                </>
            );
            setDialogBox(boxTemp);
        } else {
            setDialogBox(dialogContent);
        }
    }, [isDialogOpen, dialogContent]);

    if (!isDialogOpen) {
        return null;
    }

    return (
        <dialog id={dialogId} className="modal" open={isDialogOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Event Detail</h3>
                <div className="py-4 whitespace-normal break-words">{box}</div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={onClickClose}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default Dialog;
