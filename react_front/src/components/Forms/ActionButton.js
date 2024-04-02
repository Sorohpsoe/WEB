import React from 'react';

export function ActionButton({ label, onClick }) {
    return (
        <div className="action-button-container">
            <button className="action-button" onClick={onClick}>
                !
            </button>
            <div className="action-button-label">{label}</div>
        </div>
    );
}


