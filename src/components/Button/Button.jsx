import React from 'react';

const Button = ({ title, handleClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`
        px-4 py-2 rounded-lg
        ${disabled ? 'bg-gray-300' : 'bg-purple-600 hover:bg-purple-700'}
        text-white font-semibold
        transition-colors duration-200
      `}
    >
      {title}
    </button>
  );
};

export default Button;
