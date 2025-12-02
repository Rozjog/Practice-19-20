import { useState } from 'react';
import './DataImportExport.css';

function DataImportExport({ technologies, addTechnology }) {
    const [status, setStatus] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const exportToJSON = () => {
        try {
            const dataStr = JSON.stringify(technologies, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setStatus('Данные успешно экспортированы в JSON файл');
            setTimeout(() => setStatus(''), 3000);

        } catch (error) {
            setStatus('Ошибка экспорта данных');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    const validateImportedData = (data) => {
        if (!Array.isArray(data)) {
            throw new Error('Данные должны быть массивом');
        }

        data.forEach((tech, index) => {
            if (!tech.title || !tech.description) {
                throw new Error(`Элемент ${index + 1}: отсутствуют обязательные поля`);
            }

            if (!tech.status) tech.status = 'not-started';
            if (!tech.category) tech.category = 'Other';
            if (!tech.difficulty) tech.difficulty = 'beginner';
            if (!tech.resources) tech.resources = [];
            if (!tech.notes) tech.notes = '';
        });

        return true;
    };

    const importFromJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                validateImportedData(imported);

                imported.forEach(tech => {
                    const techWithNewId = {
                        ...tech,
                        id: Date.now() + Math.random()
                    };
                    addTechnology(techWithNewId);
                });

                setStatus(`Успешно импортировано ${imported.length} технологий`);
                setTimeout(() => setStatus(''), 3000);

            } catch (error) {
                setStatus(`Ошибка импорта: ${error.message}`);
                setTimeout(() => setStatus(''), 3000);
            }
        };

        reader.onerror = () => {
            setStatus('Ошибка чтения файла');
            setTimeout(() => setStatus(''), 3000);
        };

        reader.readAsText(file);
        event.target.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/json') {
            const artificialEvent = {
                target: {
                    files: [file]
                }
            };
            importFromJSON(artificialEvent);
        } else {
            setStatus('Перетащите JSON файл');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <div className="data-import-export">
            <h2>Проверка импорта и экспорта данных</h2>

            {status && (
                <div className={`status-message ${status.includes('Ошибка') ? 'error' : 'success'}`}>
                    {status}
                </div>
            )}

            <div className="controls">
                <button onClick={exportToJSON} className="control-btn export-btn">
                    📤 Экспорт в JSON
                </button>

                <label className="file-input-label">
                    📥 Импорт из JSON
                    <input
                        type="file"
                        accept=".json"
                        onChange={importFromJSON}
                    />
                </label>
            </div>

            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                📁 Перетащите JSON-файл сюда
            </div>
        </div>
    );
}

export default DataImportExport;