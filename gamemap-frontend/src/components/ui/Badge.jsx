import React from "react";

export function Badge({ children, variant = "default", className = "", ...props }) {
    const variants = {
        default: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        success: "bg-green-500/20 text-green-400 border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        danger: "bg-red-500/20 text-red-400 border-red-500/30",
        info: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        outline: "bg-transparent text-slate-300 border-slate-500/50",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;