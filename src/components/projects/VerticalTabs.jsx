import React from 'react';

const VerticalTabs = ({ tabs, activeKey, isSticky, onTabClick }) => (
    <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-2 
        transition-all duration-300 ease-in-out transform
        ${isSticky ? 'translate-x-0' : '-translate-x-full'}`}
    >
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-r-lg p-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`w-10 h-10 mb-2 last:mb-0 rounded-lg flex items-center justify-center 
                        relative group
                        ${activeKey === tab.key
                            ? 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    onClick={() => onTabClick(tab.key)}
                >
                    <span className="text-base font-medium uppercase">
                        {tab.label.charAt(0)}
                    </span>
                    <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm 
                        rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transition-all duration-200 whitespace-nowrap min-w-[100px] shadow-lg"
                    >
                        {tab.label}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 
                            border-8 border-transparent border-r-gray-800"
                        />
                    </div>
                </button>
            ))}
        </div>
    </div>
);

export default VerticalTabs;