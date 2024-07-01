import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import InputText from "@/components/input-text";
import Button from "@/components/button";
import PropTypes from 'prop-types';

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.object,
    imageSrc: PropTypes.object,
    placeholder: PropTypes.string,
    url: PropTypes.string,
    cardKey: PropTypes.string,
    scale: PropTypes.number,
    color: PropTypes.string,
    router: PropTypes.object,
    text: PropTypes.string,
    isInput: PropTypes.bool,
    onButtonClick: PropTypes.func,
    passwordLevels: PropTypes.object,
    onInputChange: PropTypes.func,
    value: PropTypes.string,
    id: PropTypes.string,
};

function createButtonProps(router, id, onButtonClick, placeholder) {
    const buttonProps = {};
    if (router) buttonProps.router = router;
    if (id) buttonProps.buttonKey = id;
    buttonProps.text = "Go!";
    if (onButtonClick) buttonProps.onButtonClick = onButtonClick;
    buttonProps.className = ` btn btn-sm btn-info ${ (placeholder && id !== "ampassword" ) ? 'join-item rounded-r-full' : ''}`;
    return buttonProps;
}

function createInputTextProps(placeholder, id, onInputChange) {
    const inputTextProps = {};
    if (placeholder) inputTextProps.placeholder = placeholder;
    if (id) inputTextProps.id = id;
    inputTextProps.className = "input-sm input-bordered join-item max-w-36";
    if (onInputChange) inputTextProps.onChange = onInputChange;
    return inputTextProps;
}

function createImageProps(imageSrc, title, imageStyle) {
    const imageProps = {};
    if (imageSrc) imageProps.src = imageSrc;
    if (title) imageProps.title = title;
    if (imageStyle) imageProps.style = imageStyle;
    imageProps.alt = "not found";
    imageProps.width='auto'
    imageProps.height='auto'
    imageProps.className="responsive-image"
    return imageProps;
}

function createFontAwesomeIconProps(icon, iconStyle) {
    const fontAwesomeIconProps = {};
    if (icon) fontAwesomeIconProps.icon = icon;
    if (iconStyle) fontAwesomeIconProps.style = iconStyle;
    fontAwesomeIconProps.size = "10x";
    return fontAwesomeIconProps;
}

function renderAmpasswordCard(level1, level2, level3, level4, imageContainerStyle) {
    return (
        <div className="mockup-code" style={imageContainerStyle} >
            <pre data-prefix=">" className="text-info"><code>Level 1 : {level1}</code></pre>
            <pre data-prefix=">" className="text-warning"><code>Level 2 : {level2}</code></pre>
            <pre data-prefix=">" className="text-success"><code>Level 3 : {level3}</code></pre>
            <pre data-prefix=">" className="text-primary"><code>Level 4 : {level4}</code></pre>
        </div>
    );
}

function renderRegularCard(icon, imageSrc, imageContainerStyle, fontAwesomeIconProps, imageProps) {
    return (
        <figure className="flex" style={imageContainerStyle}>
            {icon && <FontAwesomeIcon {...fontAwesomeIconProps}/>}
            {imageSrc && <Image {...imageProps}/>}
        </figure>
    );
}

function Card(props) {

    const { title = "undefined", description ="undefined", icon, imageSrc, placeholder, id,
        scale, color, router, isInput, onButtonClick, passwordLevels, onInputChange, value} = props;

    const imageContainerStyle = { height: '200px', width: '100%', overflow: 'hidden' };
    const iconStyle = color ? { color: color } : { color: "#e32400" };
    const imageStyle = scale ? { transform: `scale(${scale})`, objectFit: 'cover' } : { objectFit: 'cover' };

    const cardProps ={};
    if (title) cardProps.title = title;
    if (description) cardProps.description = description;
    let level1, level2, level3, level4;

    if (passwordLevels) {
        ({ level1, level2, level3, level4 } = passwordLevels);
    }
    const fontAwesomeIconProps = createFontAwesomeIconProps(icon, iconStyle);
    const imageProps = createImageProps(imageSrc, title, imageStyle);
    const inputTextProps = createInputTextProps(placeholder, id, onInputChange, value);
    const buttonProps = createButtonProps(router, id, onButtonClick, placeholder);

    // console.log(inputTextProps)

    return (
        <div className="card w-80 bg-base-100 shadow-xl">
          {id === "ampassword"
            ? renderAmpasswordCard(
                level1,
                level2,
                level3,
                level4,
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
