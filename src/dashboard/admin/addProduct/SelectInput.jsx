import React from 'react';

const SelectInput = ({ label, name, value, onChange, options }) => {
  return (
    <div className='mb-2'>
      {/* 🔹 Label für das Dropdown-Menü */}
      <label 
        htmlFor={name}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>

      {/* 🔹 Dropdown-Selektor */}
      <select 
        name={name}
        id={name} 
        className='w-full rounded-md bg-gray-200 p-2' // 🔹 Padding für bessere UI
        onChange={(e) => onChange(e)} // 🔹 Falls `onChange` nur den Wert benötigt: `onChange(e.target.value)`
        value={value}
      >
        {/* 🔹 Standardoption (wird nicht automatisch ausgewählt) */}
        <option value="" disabled>-- Select {label} --</option>

        {/* 🔹 Dynamisch generierte Optionen */}
        {
          options.map(option => (
            <option 
              key={option.value || option.label} // 🔹 Sicherstellen, dass jeder `key` einzigartig ist
              value={option.value}
            >
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default SelectInput;
