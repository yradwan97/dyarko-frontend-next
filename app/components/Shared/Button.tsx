import React, {
    ButtonHTMLAttributes,
    MouseEventHandler,
    ReactNode,
  } from "react";
  import Link from "next/link";
  
  type ButtonVariants = "primary" | "primary-outline";
  
  interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariants;
    linkOnClick?: MouseEventHandler<HTMLAnchorElement>;
    selected?: boolean;
    to?: string;
    location?: string
    className?: string;
    children?: ReactNode;
    disabled?: boolean
  }
  
  const Button = (props: ButtonProps) => {
    const { variant, linkOnClick, location, to, className, children, disabled } = props;
    const style =
      "font-bold btn px-2 py-2 md:px-5  tracking-tight rounded-lg transition-all duration-500 border-2";
    const variantClasses = {
      "primary": `${style} bg-main-600 text-white border-main-600 ${!disabled && 'hover:border-main-200 hover:bg-white hover:text-main-600'}`,
      "primary-outline": `${style} border-main-200 bg-white text-main-600 ${!disabled && 'hover:bg-main-600 hover:border-main-600 hover:text-white'}`
    };
  
    const btnClasses = `text-base btn no-underline ${variantClasses[variant!]} ${
      className || ""
    }`.trimEnd();
    if (to)
      return (
        <Link onClick={linkOnClick} href={to} className={btnClasses} legacyBehavior={location === "payment"}>
          {children}
        </Link>
      );
    return (
      <button
        type={props.type || "button"}
        className={btnClasses}
        onClick={props.onClick}
        value={props.value}
        disabled={disabled}
      >
        {props.children}
      </button>
    );
  };
  
  export default Button;
  