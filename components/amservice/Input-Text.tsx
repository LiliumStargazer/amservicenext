import React from "react";

interface InputTextProps {
    className?: string;
    id?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const InputText: React.FC<InputTextProps> = (props) => {
    const { className, id, placeholder = "Type Serial", onChange } = props;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {};
    if (className) inputProps.className = className;
    if (id) inputProps.id = id;
    if (placeholder) inputProps.placeholder = placeholder;
    if (onChange) inputProps.onChange = onChange;

    return <input type="text" {...inputProps} />;
}

export default InputText;