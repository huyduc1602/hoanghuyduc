import React from 'react';
import { ShimmerSimpleGallery } from "react-shimmer-effects";

const LoadingState = () => {
    return (
        <div className="container mx-auto px-4">
            {/* Loading state for tabs and controls */}
            <div className="flex justify-between items-center my-4">
                {/* Tabs loading placeholders */}
                <div className="flex space-x-4">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
                        />
                    ))}
                </div>
                
                {/* Grid controls loading placeholder */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="h-8 w-[1px] bg-gray-200"></div>
                    <div className="flex space-x-2">
                        {[1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className="h-6 w-6 bg-gray-200 rounded animate-pulse"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects grid loading state */}
            <ShimmerSimpleGallery 
                card 
                imageHeight={200} 
                caption 
                row={2} 
                col={2} 
            />
        </div>
    );
};

export default LoadingState;