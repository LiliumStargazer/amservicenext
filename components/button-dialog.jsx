import React, {useEffect, useMemo, useState} from "react";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {getEventsAliveViaSrv} from "@/lib/api";

ButtonDialog.propTypes = {
    rowEvent: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

function ButtonDialog({rowEvent, type}) {
    const [aliveEvent, setAliveEvent] = useState(null);
    const [dialogBox, setDialogBox] = useState(null);
    const id = useMemo(() => uuidv4(), []);
    
    const handleClick = () => {
        document.getElementById(id).showModal();
    };

    useEffect(() => {
        if (aliveEvent) {
            const dialogBox = (
                <>
                    <h1 className="text-primary">Code:</h1><p>{aliveEvent.EventCode}</p>
                    <h1 className="text-primary">Event:</h1><p>{aliveEvent.EventString}</p>
                    <h1 className="text-primary">Translation:</h1><p>{aliveEvent.EventTrad}</p>
                    <h1 className="text-primary">Tag1:</h1><p>{aliveEvent.Tag1Trad}</p>
                    <h1 className="text-primary">Tag2:</h1><p>{aliveEvent.Tag2Trad}</p>
                    <h1 className="text-primary">Tag3:</h1><p>{aliveEvent.Tag3Trad}</p>
                    <h1 className="text-primary">Tag4:</h1><p>{aliveEvent.Tag4Trad}</p>
                    <h1 className="text-primary">TagData:</h1><p>{aliveEvent.TagDataTrad}</p>
                </>
            );
            setDialogBox(dialogBox);
        }

    }, [aliveEvent]);

    const matchLogEventWithAliveEvents = (data) => {
        return data.find((event) => event.EventString === rowEvent);
    };

    const handleDoubleClick = () => {
        const fetchData = async () => {
            try {
                const data = await getEventsAliveViaSrv();
                const matchedEvent = matchLogEventWithAliveEvents(data);
                setAliveEvent(matchedEvent);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().catch(error => console.error(error));
        document.getElementById(id).showModal();
    }

    return (
        <>
            {type === "tagdata" ? (
                <button className="btn btn-ghost btn-xs" onClick={handleClick}>show details</button>
            ) : (
                <button className="btn btn-ghost btn-xs" onDoubleClick={handleDoubleClick}>{rowEvent}</button>
            )}
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    {type === "tagdata" ? (
                        <p className="py-4 whitespace-normal ">{rowEvent}</p>
                    ) : (
                        dialogBox && <div className=" whitespace-normal">{dialogBox}</div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );

}

export default ButtonDialog;