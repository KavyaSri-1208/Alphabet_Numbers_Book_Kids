// StoryPage.js
import React from 'react';

// Use a placeholder image for demonstration
const StoryPage = ({ data, isBack }) => {
    if (!data) return <div className={`story-page ${isBack ? 'flipping-page-back' : ''}`}></div>;

    // Class name depends on whether it's the front or back of the flipping element
    const className = `story-page ${data.side === 'left' ? 'left-page' : 'right-page'} ${isBack ? 'flipping-page-back' : ''}`;

    return (
        <div className={className}>
            <h2 className="page-header">{data.header}</h2>
            <p>{data.text.split('**').map((part, index) => 
                // Simple BOLDing mechanism for key words
                index % 2 === 1 ? <b key={index}>{part}</b> : <span key={index}>{part}</span>
            )}</p>
            <img src={data.image} alt={data.header} className="page-image" />
        </div>
    );
};

export default StoryPage;