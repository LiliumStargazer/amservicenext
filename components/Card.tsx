import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import InputText from "@/components/amservice/Input-Text";
import Button from "@/components/Button";

interface CardProps {
    title: string;
    description: string;
    icon?: object;
    imageSrc?: object;
    placeholder?: string;
    url?: string;
    cardKey?: string;
    scale?: number;
    color?: string;
    router?: object;
    text?: string;
    isInput?: boolean;
    onButtonClick?: () => void;
    passwordLevels?: {
        level1: string;
        level2: string;
        level3: string;
        level4: string;
    };
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    id?: string;
}

function createButtonProps(router: object | undefined, id: string | undefined, onButtonClick: (() => void) | undefined, placeholder: string | undefined) {
    const buttonProps: any = {};
    if (router) buttonProps.router = router;
    if (id) buttonProps.id = id;
    buttonProps.text = "Go!";
    if (onButtonClick) buttonProps.onButtonClick = onButtonClick;
    buttonProps.className = ` btn btn-sm btn-info ${ (placeholder && id !== "ampassword" ) ? 'join-item rounded-r-full' : ''}`;
    return buttonProps;
}

function createInputTextProps(placeholder: string | undefined, id: string | undefined, onInputChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined) {
    const inputTextProps: any = {};
    if (placeholder) inputTextProps.placeholder = placeholder;
    if (id) inputTextProps.id = id;
    inputTextProps.className = "input-sm input-bordered join-item max-w-36";
    if (onInputChange) inputTextProps.onChange = onInputChange;
    return inputTextProps;
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
        <div className="mockup-code" style={imageContainerStyle} >
            <pre data-prefix=">" className="text-info"><code>Level 1 : {level1}</code></pre>
            <pre data-prefix=">" className="text-warning"><code>Level 2 : {level2}</code></pre>
            <pre data-prefix=">" className="text-success"><code>Level 3 : {level3}</code></pre>
            <pre data-prefix=">" className="text-primary"><code>Level 4 : {level4}</code></pre>
        </div>
    );
}

function renderRegularCard(icon: object | undefined, imageSrc: object | undefined, imageContainerStyle: React.CSSProperties, fontAwesomeIconProps: any, imageProps: any) {
    return (
        <figure className="flex" style={imageContainerStyle}>
            {icon && <FontAwesomeIcon {...fontAwesomeIconProps}/>}
            {imageSrc && <Image {...imageProps}/>}
        </figure>
    );
}

const Card: React.FC<CardProps> = (props) => {

    const { title = "undefined", description ="undefined", icon, imageSrc, placeholder, id,
        scale, color, router, isInput, onButtonClick, passwordLevels, onInputChange} = props;

    const imageContainerStyle: React.CSSProperties = { height: '200px', width: '100%', overflow: 'hidden' };
    const iconStyle: React.CSSProperties = color ? { color: color } : { color: "#e32400" };
    const imageStyle: React.CSSProperties = scale ? { transform: `scale(${scale})`, objectFit: 'cover' } : { objectFit: 'cover' };

    let level1, level2, level3, level4;

    if (passwordLevels) {
        ({ level1, level2, level3, level4 } = passwordLevels);
    }
    const fontAwesomeIconProps = createFontAwesomeIconProps(icon, iconStyle);
    const imageProps = createImageProps(imageSrc, title, imageStyle);
    const inputTextProps = createInputTextProps(placeholder, id, onInputChange);
    const buttonProps = createButtonProps(router, id, onButtonClick, placeholder);

    return (
        <div className="card w-80 bg-base-100 shadow-xl">
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
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="join justify-end">
              {isInput && ( <InputText {...inputTextProps} /> )}
              {id !== "ampassword" && <Button {...buttonProps} />}
            </div>
          </div>
        </div>
    );
}

export default Card;