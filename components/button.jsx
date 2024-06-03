
import React, {useCallback, useContext, useEffect, useRef} from "react";
import { Context } from "@/app/Context";
import PropTypes from 'prop-types';
import useDownloadBackupOnClick from "@/hooks/useDownloadBackupOnClick";
import useHandleExtractClick from '@/hooks/useHandleExtractClick';

Button.propTypes = {
    router: PropTypes.object.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    url: PropTypes.string,
    inputValue: PropTypes.string,
    buttonKey: PropTypes.string, // Add this line
    text: PropTypes.string,
    rows: PropTypes.array,
    props: PropTypes.object
};

function Button({ router, className , disabled, url, inputValue, buttonKey, text, rows, props}) {
    const context = useContext(Context);
    const { loading, searchValue} = context;
    const searchValueRef = useRef(searchValue);

    const handleClickOnCards = useCallback(() => {
        const finalUrl = url.includes("{input}") ? url.replace("{input}", inputValue) : url;
        window.open(finalUrl, "_blank");
    }, [url, inputValue]);

    useEffect(() => {
        searchValueRef.current = searchValue;
    }, [searchValue]);

    const handleDownloadClick = useDownloadBackupOnClick(router);
    const handleExtractClick = useHandleExtractClick(rows, props);

    const onClickProp = (buttonKey === "amlog" && handleDownloadClick) || (url && handleClickOnCards) || (props && handleExtractClick);
    const classNameDefault = className || "btn btn-md btn-info join-item rounded-r-full";

    return (
        <button
            className={`${classNameDefault} ${loading ? "btn-disabled" : ""}`}
            onClick={onClickProp}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;




