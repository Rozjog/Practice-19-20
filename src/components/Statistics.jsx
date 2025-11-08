function Statistics({ technologies }) {
  const total = technologies.length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="statistics">
      <h3>Статистика в реальном времени</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Всего технологий</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{notStarted}</span>
          <span className="stat-label">Не начато</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{inProgress}</span>
          <span className="stat-label">В процессе</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Завершено</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completionRate}%</span>
          <span className="stat-label">Процент завершения</span>
        </div>
      </div>
    </div>
  );
}

export default Statistics;