import React from 'react';

const HorizontalTabs = ({ tabs, activeKey, onTabClick, tabsRef }) => (
    <div ref={tabsRef} className="flex flex-1 space-x-4 max-w-[70%]">
        {tabs.map((tab) => (
            <div
                className={`px-4 py-2 cursor-pointer transition-all duration-300 ${activeKey === tab.key
                        ? 'text-blue-600 border-b-2 border-blue-500 font-medium'
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                onClick={() => onTabClick(tab.key)}
                key={tab.id}
            >
                {tab.label}
            </div>
        ))}
    </div>
);

export default HorizontalTabs;