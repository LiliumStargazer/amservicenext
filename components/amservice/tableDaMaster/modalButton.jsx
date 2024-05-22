import React, {useEffect, useMemo, useState} from "react";
import {v4 as uuid} from "uuid";

function ModalButton(data) {
    const [text, setText] = useState('');
    const id = useMemo(() => uuid(), []);

    useEffect(() => {
        if (data)
            setText(data);
    }, [data]);

    return (
        <>
            <button className="btn btn-ghost btn-xs" onClick={() => document.getElementById(id).showModal()}>show details</button>
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">{text}</p>
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

export default ModalButton;