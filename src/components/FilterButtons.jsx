function FilterButtons({ activeFilter, setActiveFilter }) {
  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'not-started', label: 'Не начатые' },
    { key: 'in-progress', label: 'В процессе' },
    { key: 'completed', label: 'Завершенные' }
  ];

  return (
    <div className="filter-buttons">
      <h3>Показать:</h3>
      
      {filters.map(filter => (
        <button
          key={filter.key}

          onClick={() => setActiveFilter(filter.key)}
          className={activeFilter === filter.key ? 'active' : ''}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;