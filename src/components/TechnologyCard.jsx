import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ 
  id, 
  title, 
  description, 
  status, 
  notes, 
  onStatusChange, 
  onNotesChange,
  isBulkEditMode = false,
  isSelected = false,
  onSelectionToggle
}) {
  
  const handleStatusClick = () => {
    if (!isBulkEditMode) {
      onStatusChange(id);
    }
  };

  const handleCardClick = () => {
    if (isBulkEditMode) {
      onSelectionToggle();
    }
  };

  return (
    <div 
      className={`technology-card status-${status} ${isBulkEditMode ? 'bulk-mode' : ''} ${
        isSelected ? 'selected' : ''
      }`}
      onClick={handleCardClick}
    >
      {isBulkEditMode && (
        <div className="selection-checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelectionToggle}
            id={`select-${id}`}
            onClick={(e) => e.stopPropagation()}
          />
          <label htmlFor={`select-${id}`} className="sr-only">
            Выбрать {title}
          </label>
        </div>
      )}

      <div className="status-area" onClick={handleStatusClick}>
        <h3>{title}</h3>
        <p>{description}</p>

        <div className={`status-badge ${status} ${isBulkEditMode ? 'disabled' : ''}`}>
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