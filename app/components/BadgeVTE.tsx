'use client'
import React from 'react';

interface BadgeVTEProps {
    customerName: string;
    VTElink: string;
}

const BadgeVTE: React.FC<BadgeVTEProps> = ({ customerName, VTElink }) => {

    if (!customerName || !VTElink) {
        return ;
    }

    return (
        <span className="badge badge-lg badge-info min-w-fit link link-hover" onClick={() => VTElink && window.open(VTElink, '_blank')}>
            <a className="link link-hover ">{customerName}</a>
        </span>
    );
};

export default BadgeVTE;