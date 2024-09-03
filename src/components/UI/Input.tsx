import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
  step?: number;
  accept?: string;
  multiple?: boolean; // Дополнительный пропс для поддержки множественного выбора файлов
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  min,
  step,
  accept,
  multiple,
}) => {
  return (
    <div className="flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        value={type === 'file' ? undefined : value}
        onChange={onChange}
        className={className}
        min={min}
        step={step}
        accept={accept}
        multiple={multiple}
      />
      {type === 'file' && value && (
        <span className="ml-2 text-sm text-gray-500">
          {String(value).replace(/^.*[\\\/]/, '')}
        </span>
      )}
    </div>
  );
};

export default Input;
