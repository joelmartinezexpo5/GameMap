import React from "react";

export function Card({ children, className = "", ...props }) {
    return (
        <div
            className={`rounded-xl border bg-slate-900/50 border-purple-500/20 backdrop-blur-sm ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "", ...props }) {
    return (
        <div className={`p-6 pb-0 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = "", ...props }) {
    return (
        <h3 className={`text-lg font-semibold text-white ${className}`} {...props}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = "", ...props }) {
    return (
        <p className={`text-sm text-slate-400 ${className}`} {...props}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = "", ...props }) {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = "", ...props }) {
    return (
        <div className={`p-6 pt-0 ${className}`} {...props}>
            {children}
        </div>
    );
}

export default Card;