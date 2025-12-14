import React from "react";

export function Button({
    children,
    variant = "default",
    size = "default",
    className = "",
    disabled = false,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        default: "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white",
        outline: "border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent",
        ghost: "text-slate-300 hover:text-white hover:bg-slate-800 bg-transparent",
        destructive: "bg-red-600 hover:bg-red-500 text-white",
    };

    const sizes = {
        default: "px-4 py-2 text-sm",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-6 py-3 text-base",
        icon: "p-2",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;