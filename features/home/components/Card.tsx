import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Button from "@/features/home/components/Button";
import Input from "@/features/home/components/Input";
import usePasswordLevels from "@/features/home/hooks/usePasswordLevels";

interface CardProps {

    title: string;
    description: string;
    icon?: object;
    imageSrc?: object;
    id: string;
    url?: string;
    scale?: number;
    color?: string;
    isInput?: boolean;
    isButtonEnabled?: boolean;
}


function createImageProps(imageSrc: object | undefined, title: string | undefined, imageStyle: React.CSSProperties | undefined) {
    const imageProps: any = {};
    if (imageSrc) imageProps.src = imageSrc;
    if (title) imageProps.title = title;
    if (imageStyle) imageProps.style = imageStyle;
    imageProps.alt = "not found";
    imageProps.width='auto';
    imageProps.height='auto';
    imageProps.className="responsive-image";
    return imageProps;
}

function createFontAwesomeIconProps(icon: object | undefined, iconStyle: React.CSSProperties | undefined) {
    const fontAwesomeIconProps: any = {};
    if (icon) fontAwesomeIconProps.icon = icon;
    if (iconStyle) fontAwesomeIconProps.style = iconStyle;
    fontAwesomeIconProps.size = "10x";
    return fontAwesomeIconProps;
}

function renderAmpasswordCard(level1: string, level2: string, level3: string, level4: string, imageContainerStyle: React.CSSProperties) {
    return (
        <div className="mockup-code rounded-t-3xl rounded-b-3xl" style={imageContainerStyle} >
            <pre data-prefix=">" className="text-info"><code>Level 1 : {level1}</code></pre>
            <pre data-prefix=">" className="text-warning"><code>Level 2 : {level2}</code></pre>
            <pre data-prefix=">" className="text-success"><code>Level 3 : {level3}</code></pre>
            <pre data-prefix=">" className="text-primary"><code>Level 4 : {level4}</code></pre>
        </div>
    );
}

function renderRegularCard(icon: object | undefined, imageSrc: object | undefined, imageContainerStyle: React.CSSProperties, fontAwesomeIconProps: any, imageProps: any) {
    return (
        <figure className="flex rounded-t-3xl rounded-b-3xl" style={imageContainerStyle}>
            {icon && <FontAwesomeIcon {...fontAwesomeIconProps}/>}
            {imageSrc && <Image {...imageProps}/>}
        </figure>
    );
}

const Card: React.FC<CardProps> = ({title = "undefined", description ="undefined", icon, imageSrc, id,
                                   scale, color, isButtonEnabled = true, isInput=false} ) => {

    const imageContainerStyle: React.CSSProperties = { height: '200px', width: '100%', overflow: 'hidden' };
    const iconStyle: React.CSSProperties = color ? { color: color } : { color: "#e32400" };
    const imageStyle: React.CSSProperties = scale ? { transform: `scale(${scale})`, objectFit: 'cover' } : { objectFit: 'cover' };
    const { level1, level2, level3, level4 } = usePasswordLevels();
    const fontAwesomeIconProps = createFontAwesomeIconProps(icon, iconStyle);
    const imageProps = createImageProps(imageSrc, title, imageStyle);


    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            <div className="flex">
          {id === "ampassword"
            ? renderAmpasswordCard(
                  level1 ?? "",
                  level2 ?? "",
                  level3 ?? "",
                  level4 ?? "",
                  imageContainerStyle,
              )
            : renderRegularCard(
                icon,
                imageSrc,
                imageContainerStyle,
                fontAwesomeIconProps,
                imageProps,
              )}
            </div>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="join justify-end">
                <Input isInput={isInput} id={id}/>
                <Button isButtonEnabled={isButtonEnabled} id={id} />
            </div>
          </div>
        </div>
    );
}

export default Card;