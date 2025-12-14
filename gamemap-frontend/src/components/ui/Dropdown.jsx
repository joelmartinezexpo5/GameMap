import React, { useState, useRef, useEffect } from "react";

export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {React.Children.map(children, (child) => {
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
          });
        }
        if (child.type === DropdownMenuContent) {
          return isOpen ? React.cloneElement(child, { onClose: () => setIsOpen(false) }) : null;
        }
        return child;
      })}
    </div>
  );
}

export function DropdownMenuTrigger({ children, onClick, asChild }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick });
  }
  return <button onClick={onClick}>{children}</button>;
}

export function DropdownMenuContent({ children, align = "end", className = "", onClose }) {
  const alignClass = align === "end" ? "right-0" : "left-0";

  return (
    <div className={`absolute ${alignClass} z-50 mt-2 min-w-[200px] bg-slate-900 border border-purple-500/20 rounded-lg shadow-xl overflow-hidden ${className}`}>
      <div className="py-1">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null; // 👈 evita el error con null/false
          if (child.type === DropdownMenuItem) {
            return React.cloneElement(child, { onClose });
          }
          return child;
        })}
      </div>
    </div>
  );
}

export function DropdownMenuItem({ children, onClick, onClose, className = "" }) {
  const handleClick = () => {
    onClick?.();
    onClose?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className = "" }) {
  return <div className={`my-1 border-t border-purple-500/20 ${className}`} />;
}

export default DropdownMenu;