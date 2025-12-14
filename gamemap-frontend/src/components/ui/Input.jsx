import React from "react";

export function Input({ className = "", type = "text", ...props }) {
    return (
        <input
            type={type}
            className={`w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
            {...props}
        />
    );
}

export function Textarea({ className = "", rows = 4, ...props }) {
    return (
        <textarea
            rows={rows}
            className={`w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${className}`}
            {...props}
        />
    );
}

export function Label({ children, className = "", ...props }) {
    return (
        <label className={`block text-sm font-medium text-white ${className}`} {...props}>
            {children}
        </label>
    );
}

export default Input;