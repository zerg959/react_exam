import FilterCafes from './FilterCafes';

const CafesTable = () => {
  return (
    <div className="cafesTable">
      <FilterCafes />
      <ul className="cardsList"></ul>
    </div>
  );
};

export default CafesTable;
