import React from 'react';

const Button = (props) => {
  const { onClick, size, text } = props;

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <button
      onClick={onClick}
      data-tooltip-target="tooltip-bottom"
      data-tooltip-placement="bottom"
      type="button"
      className={`relative focus:outline-none text-white bg-[#019267] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg ${getSizeClass()} mr-2 mb-2 ml-10 mt-2 flex justify-center items-center`}
      style={{ height: size === 'small' ? '2rem' : size === 'large' ? '3.5rem' : '2.5rem' }}
    >
      {text}
    </button>
  );
}

export default Button;
