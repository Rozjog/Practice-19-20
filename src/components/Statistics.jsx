import { useState, useEffect } from 'react';
import './Statistics.css';

function Statistics({ technologies }) {
  const total = technologies.length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statusData = [
    { status: 'Не начато', count: notStarted, color: '#e53e3e' },
    { status: 'В процессе', count: inProgress, color: '#d69e2e' },
    { status: 'Завершено', count: completed, color: '#38a169' }
  ];

  const maxCount = Math.max(notStarted, inProgress, completed, 1);

  return (
    <div className="statistics-page">
      <h2>Статистика в реальном времени</h2>
      
      <div className="stats-main">
        <div className="stats-cards-horizontal">
          <div className="stat-card-center">
            <div className="stat-number-large">{total}</div>
            <div className="stat-label-center">Всего технологий</div>
          </div>
          <div className="stat-card-center">
            <div className="stat-number-large">{notStarted}</div>
            <div className="stat-label-center">Не начато</div>
          </div>
          <div className="stat-card-center">
            <div className="stat-number-large">{inProgress}</div>
            <div className="stat-label-center">В процессе</div>
          </div>
          <div className="stat-card-center">
            <div className="stat-number-large">{completed}</div>
            <div className="stat-label-center">Завершено</div>
          </div>
          <div className="stat-card-center highlight">
            <div className="stat-number-large">{completionRate}%</div>
            <div className="stat-label-center">Процент завершения</div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Распределение по статусам</h3>
          <div className="horizontal-bars">
            {statusData.map((item, index) => (
              <div key={index} className="bar-row">
                <div className="bar-info">
                  <div className="bar-color-indicator" style={{backgroundColor: item.color}}></div>
                  <span className="bar-title">{item.status}</span>
                  <span className="bar-count">{item.count}</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-progress"
                    style={{
                      width: `${(item.count / maxCount) * 100}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;