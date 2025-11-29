// BookContainer.js
import React, { useState, useEffect } from 'react';
import StoryPage from './StoryPage';
import { storyData } from '../data/StoryData';

const BookContainer = () => {
    // currentPage stores the index of the data entry that is currently visible
    const [currentPageIndex, setCurrentPageIndex] = useState(0); 
    const [isFlipping, setIsFlipping] = useState(false);

    // Calculate indices for the two visible pages and the next page in line
    const leftPageData = storyData[currentPageIndex];
    const rightPageData = storyData[currentPageIndex + 1];
    const nextPageData = storyData[currentPageIndex + 2];
    
    // The index where the flip animation ends
    const nextPageIndex = currentPageIndex + 2;

    const totalPages = storyData.length;
    const canGoNext = nextPageIndex < totalPages;
    const canGoPrev = currentPageIndex > 0;

    // Handles the actual flip and state update
    const handleFlip = (direction) => {
        if (isFlipping) return;

        if (direction === 'next' && canGoNext) {
            setIsFlipping(true);
            
            // Wait for the CSS transition (1s) before updating the state
            setTimeout(() => {
                setCurrentPageIndex(nextPageIndex);
                setIsFlipping(false);
            }, 1000); 

        } else if (direction === 'prev' && canGoPrev) {
            // Note: Reverse flip logic is more complex in 3D CSS and often handled 
            // by resetting the rotation and starting the animation class from a different state.
            // For simplicity, we implement a direct jump back after a short delay to simulate completion.
            setCurrentPageIndex(currentPageIndex - 2);
        }
    };

    return (
        <div className="book-shell">
            {/* 1. Static Left Page (Content doesn't move during flip) */}
            <StoryPage data={leftPageData} />

            {/* 2. The Flipping Wrapper */}
            <div className={`page-flip-wrapper ${isFlipping ? 'is-flipping' : ''}`}>
                {/* Front side of the page being flipped (Content that was on the right) */}
                <StoryPage data={rightPageData} />

                {/* Back side of the page being flipped (Content that will be on the left of the next spread) */}
                <StoryPage data={nextPageData} isBack={true} />
            </div>

            {/* 3. The New Right Page (Only visible after the flip completes) */}
            <StoryPage data={storyData[nextPageIndex + 1]} />

            {/* Navigation Controls */}
            <div className="navigation">
                <button 
                    className="nav-button prev" 
                    onClick={() => handleFlip('prev')} 
                    disabled={!canGoPrev || isFlipping}
                >
                    &lt; Prev
                </button>
                <button 
                    className="nav-button next" 
                    onClick={() => handleFlip('next')} 
                    disabled={!canGoNext || isFlipping}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
};

export default BookContainer;