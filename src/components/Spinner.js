
import React from 'react';
import '../css/LoadingSpinner.css';

export const Spinner = () => {
    return (
        <div className="loading-overlay">
            <button className="loading-button" disabled>
                <span className="spinner"></span>
                Loading...
            </button>
        </div>
    );
};