import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, text, color, className="text-white p-2 rounded", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;