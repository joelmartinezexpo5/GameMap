import React from "react";

export function Avatar({ children, className = "", ...props }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "", className = "", ...props }) {
  if (!src) return null;
  
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ children, className = "", ...props }) {
  return (
    <span
      className={`flex items-center justify-center w-full h-full text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Avatar;