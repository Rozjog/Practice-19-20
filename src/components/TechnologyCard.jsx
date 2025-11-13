import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
  const handleStatusClick = () => {
    onStatusChange(id);
  };

  return (
    <div className={`technology-card status-${status}`}>
      <div className="status-area" onClick={handleStatusClick}>
        <h3>{title}</h3>
        <p>{description}</p>


        <div className={`status-badge ${status}`}>
          {status === 'not-started' && 'Не начато'}
          {status === 'in-progress' && 'В процессе'}
          {status === 'completed' && 'Завершено'}
        </div>
      </div>

      <TechnologyNotes
        notes={notes}
        onNotesChange={onNotesChange}
        techId={id}
      />
    </div>
  );
}

export default TechnologyCard;