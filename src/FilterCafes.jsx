// src/FilterCafes.jsx

import React from 'react';
const FilterCafes = ({ subwayOptions, selectedCode, onFilterChange }) => {
  
  return (
    <div className="controls">
      <select 
        name="subway" 
        id="subway"
        value={selectedCode}
        onChange={(e) => onFilterChange(e.target.value)} 
      >
        <option value="All">Все</option>
        
        {subwayOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
        
      </select>
    </div>
  );
};

export default FilterCafes;