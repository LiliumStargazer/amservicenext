import React,{useContext, useEffect} from "react";
import {Context} from "@/app/Context";

function Alert(){
    const {message, setMessage} = useContext(Context);

    useEffect(() => {
    }, [message, setMessage]);

    const handleClickOnClose = () => {
        setMessage('');
    }

    let alert = (
        <div role="alert" className="alert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{message}</span>
            {
                !message.includes("Download") && (
                    <button
                        className="btn btn-sm btn-info"
                        onClick={handleClickOnClose}
                    >
                        Close
                    </button>
                )
            }
        </div>
    );

    if (message === "")
        return null;

    return alert;
}

export default Alert