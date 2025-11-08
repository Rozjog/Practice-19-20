function TechnologyCard({ id, title, description, status, onStatusChange }) {

  const handleClick = () => {
    onStatusChange(id);
  };

  return (
    <div 
      className={`technology-card status-${status}`}
      onClick={handleClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={`status-badge ${status}`}>
        {status === 'not-started' && 'Не начато'}
        {status === 'in-progress' && 'В процессе'}
        {status === 'completed' && 'Завершено'}
      </div>
    </div>
  );
}

export default TechnologyCard;