import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import FilterCafes from './FilterCafes';
import cafesData from '../__fixtures__/cafes'; //
const SUBWAY_MAP = [
	{ name: "Арбатская", code: "Arbat" },
	{ name: "Александровский сад", code: "Alexanders Garden" },
	{ name: "Московская", code: "Moscow" },
  { name: "Театральная", code: "Theatr" },
];

const CafesTable = () => {
  const [allCafes, setAllCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubwayCode, setSelectedSubwayCode] = useState('All');
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setAllCafes(cafesData.cafes);
      } catch (error) {
        console.error("Ошибка при загрузке кафе:", error);
        setAllCafes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
  }, []);

  const subwayOptionsForFilter = useMemo(() => {
    const availableCodes = new Set(allCafes.map(cafe => cafe.subwayCode));
    
    return SUBWAY_MAP.filter(mapItem => availableCodes.has(mapItem.code));
  }, [allCafes]);

  const filteredCafes = useMemo(() => {
    if (selectedSubwayCode === 'All') {
      return allCafes;
    }
    return allCafes.filter(cafe => cafe.subwayCode === selectedSubwayCode);
  }, [allCafes, selectedSubwayCode]);

  const handleFilterChange = useCallback((newCode) => {
    setSelectedSubwayCode(newCode);
  }, []);

  if (loading) {
    return <div id="container" className="container m-3">Загрузка данных кафе...</div>;
  }

  return (
    <div id="container" className="container m-3">
      <div className="cafesTable">
        <FilterCafes 
            subwayOptions={subwayOptionsForFilter} 
            selectedCode={selectedSubwayCode}
            onFilterChange={handleFilterChange}
        /> 

        {/* Список Кафе */}
        <ul className="cardsList">
          {filteredCafes.length === 0 ? (
            <p>Не найдено кафе по заданным критериям.</p>
          ) : (
            filteredCafes.map((cafe) => (
              <li key={cafe.id} className="card">
                {/* Используем заглушку, если img пустой или отсутствует */}
                <img 
                  src={cafe.img || "https://via.placeholder.com/150"} 
                  alt={cafe.name || "Cafe Image"} 
                />
                <h2>{cafe.name || 'Нет названия'}</h2>
                <p>{cafe.desc || 'decs'}</p>
                <p>Address: {cafe.address}</p>
                <p>Subway: {cafe.subwayCode || 'N/A'}</p>
                <p>{cafe.workTime || '8:00 - 20:00'}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CafesTable;