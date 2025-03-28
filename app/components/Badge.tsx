'use client'

import React from "react";

interface BadgeProps {
    serial: string;
}

const Badge: React.FC<BadgeProps> = ({serial}) => {
    return (
        serial ? <span className="badge badge-lg badge-info">{serial}</span> : null
    );
}

export default Badge;