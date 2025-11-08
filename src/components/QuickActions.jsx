function QuickActions({ markAllCompleted, resetAllStatuses, pickRandomTech }) {
  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <button onClick={markAllCompleted} className="action-btn">
        Отметить все как выполненные
      </button>
      <button onClick={resetAllStatuses} className="action-btn">
        Сбросить все статусы
      </button>
      <button onClick={pickRandomTech} className="action-btn">
        Случайный выбор следующей технологии
      </button>
    </div>
  );
}

export default QuickActions;