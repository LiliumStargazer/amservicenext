"use client"

import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image, {StaticImageData} from "next/image";
import Button from "@/app/components/home/Button";
import Input from "@/app/components/home/Input";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {PasswordLevels} from "@/app/types/types";


interface CardProps {
    title: string;
    description: string;
    icon?: IconProp;
    imageSrc?: string | StaticImageData;
    id: string;
    url?: string;
    color?: string;
    isInput?: boolean;
    isButtonEnabled?: boolean;
    handleKeyDownOnAlive?: (event: React.KeyboardEvent) => void;
    setAliveSerial?: (serial: string) => void;
    handleKeyDownOnLog?: (event: React.KeyboardEvent) => void;
    setSerialTemp?: (serial: string) => void;
    setPassword?: (password: string) => void;
    passwords?: PasswordLevels;
    onClickWithAliveValue?: () => void;
    handleClickLog?: () => void;
    loading?: boolean;
}

const Card: React.FC<CardProps> = ({
                                       title = "undefined",
                                       description ="undefined",
                                       icon,
                                       imageSrc,
                                       id,
                                       color,
                                       isButtonEnabled = true,
                                       isInput=false,
                                       handleKeyDownOnAlive,
                                       setAliveSerial,
                                       handleKeyDownOnLog,
                                       setSerialTemp,
                                       setPassword,
                                       passwords,
                                       onClickWithAliveValue,
                                       handleClickLog,
                                       loading

} ) => {

    const imageContainerStyle: React.CSSProperties = { height: '200px', width: '100%', overflow: 'hidden' };
    const iconStyle: React.CSSProperties = color ? { color: color } : { color: "#e32400" };
    // const imageStyle: React.CSSProperties = scale ? { transform: `scale(${scale})`, objectFit: 'cover' } : { objectFit: 'cover' };


    const cardType = (id: string) => {
        if (id === "ampassword" && passwords) {
            return (
                <div className="mockup-code rounded-t-3xl rounded-b-3xl" style={imageContainerStyle} >
                    <pre data-prefix=">" className="text-info"><code>Level 1 : {passwords.Level1}</code></pre>
                    <pre data-prefix=">" className="text-warning"><code>Level 2 : {passwords.Level2}</code></pre>
                    <pre data-prefix=">" className="text-success"><code>Level 3 : {passwords.Level3}</code></pre>
                    <pre data-prefix=">" className="text-primary"><code>Level 4 : {passwords.Level4}</code></pre>
                </div>
            );
        }
        else {
            return (
                <figure className="flex rounded-t-3xl rounded-b-3xl" style={imageContainerStyle}>
                    {icon && <FontAwesomeIcon icon={icon} style={iconStyle} size="10x" />}
                    {imageSrc && <Image src={imageSrc} alt={title} className="responsive-image"  />}
                </figure>
            );
        }

    }

    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            <div className="flex">
                {cardType(id)}
            </div>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="join justify-end">
                <Input
                    isInput={isInput}
                    id={id}
                    loading={loading}
                    {...(id === "alive" && { handleKeyDownOnAlive, setAliveSerial })}
                    {...(id === "amlog" && { handleKeyDownOnLog, setSerialTemp })}
                    {...(id === "ampassword" && { setPassword })}
                />
                <Button
                    isButtonEnabled={isButtonEnabled}
                    id={id}
                    loading={loading}
                    {...(id === "alive" &&  {onClickWithAliveValue })}
                    {...(id === "amlog" && { handleClickLog })}
                />
            </div>
          </div>
        </div>
    );
}

export default Card;