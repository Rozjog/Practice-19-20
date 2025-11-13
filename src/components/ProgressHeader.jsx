import './ProgressHeader.css';

function ProgressHeader({ technologies, progress }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;

  return (
    <div className="progress-header">
      <h2>Мой прогресс обучения</h2>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{completed} из {total} технологий освоено ({progress}%)</p>
    </div>
  );
}

export default ProgressHeader;