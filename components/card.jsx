// src/components/Card.js
import React, { useContext, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import InputText from "@/components/input-text";
import Button from "@/components/button";
import {Context} from "@/app/Context";
import usePasswordLevels from "@/hooks/usePasswordLevels";
import PropTypes from 'prop-types';

function Card({ title, description, icon, imageSrc, placeholder, url, cardKey, scale, color, router}) {
    const { level1, level2, level3, level4, setPassword, password } = usePasswordLevels();
    const [aliveSerial, setAliveSerial] = useState("");
    const {serial, setSerial} = useContext(Context);

    const imageContainerStyle = { height: '200px', width: '100%', overflow: 'hidden' };
    const iconStyle = color ? { color: color } : { color: "#e32400" };
    const imageStyle = scale ? { transform: `scale(${scale})`, objectFit: 'cover' } : { objectFit: 'cover' };


    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            {cardKey==="ampassword" ? (
                <div className="mockup-code" style={imageContainerStyle} >
                    <pre data-prefix=">" className="text-info"><code>Level 1 : {level1}</code></pre>
                    <pre data-prefix=">" className="text-warning"><code>Level 2 : {level2}</code></pre>
                    <pre data-prefix=">" className="text-success"><code>Level 3 : {level3}</code></pre>
                    <pre data-prefix=">" className="text-primary"><code>Level 4 : {level4}</code></pre>
                </div>
            ):
                (
                    <figure className="flex" style={imageContainerStyle}>
                        {icon && <FontAwesomeIcon icon={icon} size="10x" style={iconStyle}/>}
                        {imageSrc && <Image width='auto' height='auto' src={imageSrc} alt={title} style={imageStyle}
                                            className="responsive-image"/>}
                    </figure>
                )}
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="join justify-end">
                    {cardKey && (
                        <InputText
                            className="input-sm input-bordered join-item max-w-36"
                            placeholder={placeholder}
                            // value={handleValue(cardKey)}
                            // onChange={handleChange}
                            type={cardKey}
                            setPassword={setPassword}
                            password={password}
                        />
                    )}
                    {cardKey !== "password" && (
                        <Button
                            className={` btn btn-sm btn-info ${ (placeholder && cardKey !== "ampassword" ) ? 'join-item rounded-r-full' : ''}`}
                            url={url}
                            // inputValue={handleValue(cardKey)}
                            router={router}
                            buttonKey={cardKey}
                            text="Go!"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.object,
    imageSrc: PropTypes.string,
    placeholder: PropTypes.string,
    url: PropTypes.string,
    cardKey: PropTypes.string,
    scale: PropTypes.number,
    color: PropTypes.string,
    router: PropTypes.object,
};

export default Card;
