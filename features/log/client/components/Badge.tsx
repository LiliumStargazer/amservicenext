import React from "react";
import useStore from "@/app/store";

const Badge: React.FC = () => {
    const storedSerial = useStore(state => state.storedSerial);

    return (
        <span className="badge badge-lg badge-info">{storedSerial}</span>
    );
}

export default Badge;