'use client'
import React from 'react';

interface BadgeLinkProps {
    text: string;
    link: string;
}

const BadgeLink: React.FC<BadgeLinkProps> = ({ text, link }) => {

    if (!text || !link) {
        return ;
    }

    return (
        <span className="badge badge-lg badge-info min-w-fit link link-hover" onClick={() => link && window.open(link, '_blank')}>
            <a className="link link-hover ">{text}</a>
        </span>
    );
};

export default BadgeLink;