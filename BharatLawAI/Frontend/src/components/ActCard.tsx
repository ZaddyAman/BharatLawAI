
import React from 'react';

const ActCard = ({ act }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">{act.metadata.heading}</h2>
            <p className="text-gray-700">{act.text}</p>
        </div>
    );
};

export default ActCard;
