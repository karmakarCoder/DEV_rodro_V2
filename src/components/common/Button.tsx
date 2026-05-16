import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-heading font-bold uppercase transition-all duration-200 active:translate-x-1 active:translate-y-1 active:shadow-none";

  const variants = {
    primary: "bg-primary-text text-primary",
    outline:
      "bg-transparent text-primary-text border-2 border-brand-dark hover:bg-secondary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base md:text-lg",
    lg: "px-10 py-4 text-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
