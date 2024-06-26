import React from 'react';

export default function Button({ onClick, colorClass, hoverColorClass, text, icon, disabled }) {
    return (
        <button
            className={`bg-${colorClass} hover:bg-${hoverColorClass} text-white font-bold py-2 px-4 rounded flex items-center`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {text}
        </button>
    );
};
