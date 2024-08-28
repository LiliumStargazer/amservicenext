import React from "react";

const Input = ({ isInput, ...rest }: { isInput: boolean }) => {


    return isInput ?
        <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs mr-2"
            {...rest}
        /> :
        null;
}

export default Input;