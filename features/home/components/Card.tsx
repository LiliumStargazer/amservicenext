import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Button from "@/features/home/components/Button";
import Input from "@/features/home/components/Input";

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
    router?: any;
    isInput?: boolean;
    onButtonClick?: () => void;
    passwordLevels?: {
        level1: string;
        level2: string;
        level3: string;
        level4: string;
        setPassword: (password: string) => void;
        password: string;
    };
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: any;
    event?: any;
    value?: string;
    id?: string;
    isButtonEnabled?: boolean;
}

function createButtonProps(router: object | undefined, id: string | undefined, onButtonClick: (() => void) | undefined ,
    isButtonEnabled: boolean | undefined) {

    const buttonProps: any = {};
    buttonProps.isButtonEnabled = !!isButtonEnabled;
    if (router) buttonProps.router = router;
    if (id) buttonProps.id = id;
    if (onButtonClick) buttonProps.onClick = onButtonClick;
    return buttonProps;
}

function createInputProps(placeholder: string | undefined, id: string | undefined,
                          onInputChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
                          isInput: boolean | undefined, onKeyDown: any | undefined) {
    const inputProps: any = {};
    if (placeholder) inputProps.placeholder = placeholder;
    if (id) inputProps.id = id;
    if (onInputChange) inputProps.onChange = onInputChange;
    inputProps.isInput = !!isInput;
    if (onKeyDown) inputProps.onKeyDown = onKeyDown;
    return inputProps;
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

const Card: React.FC<CardProps> = (props) => {

    const { title = "undefined", description ="undefined", icon, imageSrc, placeholder, id,
        scale, color, router, isInput, onButtonClick, passwordLevels, onInputChange, isButtonEnabled = true,
        onKeyDown} = props;

    const imageContainerStyle: React.CSSProperties = { height: '200px', width: '100%', overflow: 'hidden' };
    const iconStyle: React.CSSProperties = color ? { color: color } : { color: "#e32400" };
    const imageStyle: React.CSSProperties = scale ? { transform: `scale(${scale})`, objectFit: 'cover' } : { objectFit: 'cover' };

    let level1, level2, level3, level4;

    if (passwordLevels) {
        ({ level1, level2, level3, level4 } = passwordLevels);
    }
    const fontAwesomeIconProps = createFontAwesomeIconProps(icon, iconStyle);
    const imageProps = createImageProps(imageSrc, title, imageStyle);
    const inputProps = createInputProps(placeholder, id, onInputChange, isInput, onKeyDown);
    const buttonProps = createButtonProps(router, id, onButtonClick, isButtonEnabled);

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
                <Input {...inputProps}/>
                <Button {...buttonProps} />
            </div>
          </div>
        </div>
    );
}

export default Card;