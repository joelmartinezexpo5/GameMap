import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function Select({ value, onValueChange, children, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={selectRef} className={`relative ${className}`}>
            {React.Children.map(children, (child) => {
                if (child.type === SelectTrigger) {
                    return React.cloneElement(child, {
                        onClick: () => setIsOpen(!isOpen),
                        isOpen,
                    });
                }
                if (child.type === SelectContent) {
                    return isOpen
                        ? React.cloneElement(child, {
                            onSelect: (val) => {
                                onValueChange(val);
                                setIsOpen(false);
                            },
                            currentValue: value,
                        })
                        : null;
                }
                return child;
            })}
        </div>
    );
}

export function SelectTrigger({ children, onClick, isOpen, className = "" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-between px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${className}`}
        >
            <span className="text-slate-300">{children}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
    );
}

export function SelectValue({ placeholder, currentValue, options = [] }) {
    const selected = options.find(opt => opt.value === currentValue);
    return (
        <span className="text-slate-300">
            {selected ? selected.label : placeholder}
        </span>
    );
}

export function SelectContent({ children, onSelect, currentValue, className = "" }) {
    return (
        <div className={`absolute z-50 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden ${className}`}>
            <div className="max-h-60 overflow-y-auto py-1">
                {React.Children.map(children, (child) => {
                    if (child.type === SelectItem) {
                        return React.cloneElement(child, {
                            onSelect,
                            isSelected: child.props.value === currentValue,
                        });
                    }
                    return child;
                })}
            </div>
        </div>
    );
}

export function SelectItem({ children, value, onSelect, isSelected, className = "" }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(value)}
            className={`w-full px-4 py-2 text-left text-sm transition-colors ${isSelected
                    ? "bg-purple-500/20 text-purple-400"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                } ${className}`}
        >
            {children}
        </button>
    );
}

export default Select;