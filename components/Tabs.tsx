import React, { useState } from 'react';

const Tabs = ({ children }: { children: any }) => {
  // مقداردهی اولیه activeTab با توجه به defaultTab
  const [activeTab, setActiveTab] = useState(() => {
    const defaultChild = children.find((child: any) => child.props.defaultTab);
    return defaultChild ? defaultChild.props.label : children[0].props.label;
  });

  const handleClick = (e: any, newActiveTab: string) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex">
        {children.map((child: any) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'border-b-2 border-blue-700 text-blue-700' : ''
            } flex-1 text-gray-700 font-medium py-2`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {children.map((child: any) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({
  label,
  children,
  defaultTab,
}: {
  label: string;
  children: any;
  defaultTab?: boolean;
}) => {
  return (
    <div className="hidden" data-default-tab={defaultTab}>
      {children}
    </div>
  );
};

export { Tabs, Tab };
