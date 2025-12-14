import React, { useState } from "react";

export function Tabs({ defaultValue, children, className }) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    // Clonamos los hijos y pasamos props necesarias
    return (
        <div className={className}>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                return React.cloneElement(child, {
                    activeTab,
                    setActiveTab,
                });
            })}
        </div>
    );
}

export function TabsList({ children, className, activeTab, setActiveTab }) {
    return (
        <div className={className}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, { activeTab, setActiveTab })
            )}
        </div>
    );
}

export function TabsTrigger({ value, children, className, activeTab, setActiveTab }) {
    const isActive = activeTab === value;
    return (
        <button
            onClick={() => setActiveTab(value)}
            className={`${className} ${isActive ? "bg-purple-500/20" : ""}`}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children, className, activeTab }) {
    if (activeTab !== value) return null;
    return <div className={className}>{children}</div>;
}
