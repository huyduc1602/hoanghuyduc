import React from 'react';

const HorizontalTabs = ({ tabs, activeKey, onTabClick, tabsRef }) => (
    <div ref={tabsRef} className="flex flex-1 space-x-4 max-w-[70%]">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabClick(tab.key)}
                className={`flex-1 ${
                    activeKey === tab.key
                        ? 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
                        : 'bg-gray-200'
                } hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg 
                dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center whitespace-nowrap`}
            >
                {tab.label}
            </button>
        ))}
    </div>
);

export default HorizontalTabs;