import React from 'react';

const GridControls = ({ columns, onColumnChange }) => (
    <div className="hidden md:flex items-center space-x-4">
        <div className="h-8 w-[1px] bg-gray-200"></div>
        <div className="flex space-x-2">
            {[1, 2, 3].map((col) => (
                <button
                    key={col}
                    className="hover:scale-110 transition-transform"
                    onClick={() => onColumnChange(col)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: columns === col ? 'blue' : '' }}
                        width="24" height="24" 
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        {col === 1 && <path d="M4 4h16v16H4V4m2 2v12h12V6H6z" />}
                        {col === 2 && <path d="M3 3h8v8H3V3m2 2v4h4V5H5m8-2h8v8h-8V3m2 2v4h4V5h-4M3 13h8v8H3v-8m2 2v4h4v-4H5m8-2h8v8h-8v-8m2 2v4h4v-4h-4" />}
                        {col === 3 && <path d="M2 2h6v6H2V2m7 0h6v6H9V2m7 0h6v6h-6V2M2 9h6v6H2V9m7 0h6v6H9V9m7 0h6v6h-6V9M2 16h6v6H2v-6m7 0h6v6H9v-6m7 0h6v6h-6v-6" />}
                    </svg>
                </button>
            ))}
        </div>
    </div>
);

export default GridControls;