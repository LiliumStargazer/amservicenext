import React, {useEffect, useRef} from "react";
import useStore from "../../../../app/store";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    router?: object;
    url?: string;
    inputValue?: string;
    id?: string;
    text?: string;
    rows?: any[];
}

const ButtonGeneric: React.FC<ButtonProps> = ({
                                           router,
                                           className = "btn btn-md btn-info join-item rounded-r-full",
                                           disabled,
                                           url,
                                           inputValue,
                                           id,
                                           text,
                                           rows,
                                           onClick,
                                           ...rest
                                       }) => {
    const loading = useStore(state => state.loading);
    const searchValue = useStore(state => state.searchValue);
    const searchValueRef = useRef(searchValue);

    useEffect(() => {
        searchValueRef.current = searchValue;
    }, [searchValue]);

    // Costruzione della classe del bottone
    const buttonClassName = `${className} ${loading ? "btn-disabled" : ""}`;

    return (
        <button
            className={buttonClassName}
            disabled={disabled || loading}
            data-router={router ? JSON.stringify(router) : undefined}
            data-url={url}
            data-input-value={inputValue}
            data-button-key={id}
            data-text={text}
            data-rows={rows ? JSON.stringify(rows) : undefined}
            onClick={onClick}
            {...rest}
        >
            {text}
        </button>
    );
}

export default ButtonGeneric;
