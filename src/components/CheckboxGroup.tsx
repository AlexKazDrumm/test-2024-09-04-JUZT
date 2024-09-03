import React from 'react';

interface CheckboxGroupProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (value: string) => void;
  getCount: (value: string) => number;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, options, selectedOptions, onChange, getCount }) => {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      {options.map(option => (
        <div key={option}>
          <input
            type="checkbox"
            id={`${title}-${option}`}
            onChange={() => onChange(option)}
            checked={selectedOptions.includes(option)}
          />
          <label htmlFor={`${title}-${option}`} className="ml-2">
            {option} ({getCount(option)})
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;