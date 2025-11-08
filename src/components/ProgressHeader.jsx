function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="progress-header">
      <h2>Мой прогресс обучения</h2>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{completed} из {total} технологий освоено ({Math.round(progress)}%)</p>
    </div>
  );
}

export default ProgressHeader;