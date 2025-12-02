function TechnologyNotes({ notes, onNotesChange, techId }) {
    return (
        <div className="notes-section">
            <h4>Мои заметки:</h4>
            <textarea className="text-area"
                value={notes}
                onChange={(e) => onNotesChange(techId, e.target.value)}
                placeholder="Записывайте сюда важные моменты..."
                rows="3"
            />
        </div>
    );
}

export default TechnologyNotes;