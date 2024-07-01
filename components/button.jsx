
import React, { useContext, useEffect, useRef} from "react";
import { Context } from "@/app/Context";
import PropTypes from 'prop-types';

Button.propTypes = {
    router: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    url: PropTypes.string,
    inputValue: PropTypes.string,
    buttonKey: PropTypes.string, // Add this line
    text: PropTypes.string,
    rows: PropTypes.array,
    props: PropTypes.object,
    id: PropTypes.string,
    onButtonClick: PropTypes.func,
};

function Button({ router, className = "btn btn-md btn-info join-item rounded-r-full" , disabled, url, inputValue, id, text, rows, props, onButtonClick}) {
    const context = useContext(Context);
    const { loading, searchValue} = context;
    const searchValueRef = useRef(searchValue);

    useEffect(() => {
        searchValueRef.current = searchValue;
    }, [searchValue]);

    const buttonProps = {};

    if (router) buttonProps.router = rows;
    if (className) buttonProps.className = `${className} ${loading ? "btn-disabled" : ""}`;
    if (disabled) buttonProps.disabled = disabled;
    if (url) buttonProps.url = url;
    if (inputValue) buttonProps.inputValue = inputValue;
    if (id) buttonProps.buttonKey = id;
    if (text) buttonProps.text = text;
    if (rows) buttonProps.rows = rows;
    if (props) buttonProps.props = props;
    if (onButtonClick) buttonProps.onClick = onButtonClick;

    return (
        <button
            {...buttonProps}
        >
            {text}
        </button>
    );
}

export default Button;




