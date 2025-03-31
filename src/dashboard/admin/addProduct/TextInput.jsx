import React from 'react';

const TextInput = ({ label, name, value, onChange, placeholder, type = "text", required = false }) => {
  return (
    <div className="mb-2">
      {/* 🔹 Label für das Eingabefeld */}
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {/* 🔹 Eingabefeld */}
      <input 
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange} // Falls nur der Wert benötigt wird: `onChange={(e) => onChange(e.target.value)}`
        placeholder={placeholder}
        required={required} // 🔹 Falls das Feld erforderlich ist
        className="w-full rounded-md bg-gray-200 px-3 py-2 
                   border border-gray-300 focus:border-indigo-500 
                   focus:ring focus:ring-indigo-200 focus:ring-opacity-50 
                   focus:outline-none"
      />
    </div>
  );
};

export default TextInput;
