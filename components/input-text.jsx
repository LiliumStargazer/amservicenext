import React from "react";
import PropTypes from "prop-types";

InputText.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

function InputText(props) {
    const {className, id, placeholder = "Type Serial", onChange} = props;

    const inputProps = {};
    if (className) inputProps.className = className;
    if (id) inputProps.id = id;
    if (placeholder) inputProps.placeholder = placeholder;
    if (onChange) inputProps.onChange = onChange;

    return <input {...inputProps} />;
}

export default InputText;
