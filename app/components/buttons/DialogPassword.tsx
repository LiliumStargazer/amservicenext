'use client'

import React, {ChangeEvent, useEffect} from "react";
import {v4 as uuidv4} from 'uuid';
import usePasswordLevels from "@/app/hooks/usePasswordLevels";


interface DialogPasswordProps {
    openRequest: boolean;
    setOpenRequest: (openRequest: boolean) => void;
}

const DialogPassword: React.FC <DialogPasswordProps>= ({openRequest, setOpenRequest}) => {
    const dialogId = uuidv4();
    const imageContainerStyle: React.CSSProperties = { height: '200px', width: '100%', overflow: 'hidden' };
    const [password, setPassword] = React.useState<string>('');
    const { passwords } = usePasswordLevels(password);

    useEffect(() => {
        if (openRequest) {
            const dialog = document.getElementById(dialogId) as HTMLDialogElement;
            dialog?.showModal();
        }
    }, [openRequest, dialogId]);

    if (!openRequest) {
        return null;
    }

    return (
        <dialog id={dialogId} className="modal">
            <div className="modal-box w-96">
                <div className="flex justify-center">
                    <div className="card w-80 bg-base-100 shadow-xl">
                        <div className="flex">
                            <div className="mockup-code rounded-t-3xl rounded-b-3xl" style={imageContainerStyle}>
                                <pre data-prefix=">"
                                     className="text-info"><code>Level 1 : {passwords.Level1}</code></pre>
                                <pre data-prefix=">"
                                     className="text-warning"><code>Level 2 : {passwords.Level2}</code></pre>
                                <pre data-prefix=">"
                                     className="text-success"><code>Level 3 : {passwords.Level3}</code></pre>
                                <pre data-prefix=">"
                                     className="text-primary"><code>Level 4 : {passwords.Level4}</code></pre>
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">Password Calculation</h2>
                            <div className="join justify-end">
                                <input
                                    type="text"
                                    placeholder="Insert Password"
                                    className="input input-sm input-bordered w-full max-w-xs mr-2"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword && setPassword(event.target.value)}
                                />
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn" onClick={() => {
                                        const dialog = document.getElementById(dialogId) as HTMLDialogElement;
                                        dialog.close();
                                        setOpenRequest(false);
                                    }}>Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default DialogPassword;
