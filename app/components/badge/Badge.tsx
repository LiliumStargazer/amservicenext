'use client'

import React from "react";

interface BadgeProps {
    text: string;

}

const Badge: React.FC<BadgeProps> = ({text}) => {
    return (
        text ? <span className="badge badge-lg badge-info min-w-fit">{text}</span> : null
    );
}

export default Badge;