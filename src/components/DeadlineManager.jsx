import { useState, useEffect } from 'react';
import { useNotification } from './NotificationContent';
import './DeadlineManager.css';

function DeadlineManager() {
    const [technologies, setTechnologies] = useState([]);
    const [selectedTech, setSelectedTech] = useState([]);
    const [deadline, setDeadline] = useState('');
    const [errors, setErrors] = useState({});
    
    const { showNotification } = useNotification();

    useEffect(() => {
        loadTechnologies();
    }, []);

    const loadTechnologies = () => {
        try {
            const saved = localStorage.getItem('technologies');
            if (saved) {
                const parsed = JSON.parse(saved);
                setTechnologies(parsed);
            }
        } catch (error) {
            console.error('Ошибка загрузки технологий:', error);
            showNotification('Ошибка загрузки технологий', 'error');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (selectedTech.length === 0) {
            newErrors.selectedTech = 'Выберите хотя бы одну технологию';
        }

        if (!deadline.trim()) {
            newErrors.deadline = 'Укажите дедлайн';
        } else {
            const deadlineDate = new Date(deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (deadlineDate < today) {
                newErrors.deadline = 'Дедлайн не может быть в прошлом';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTechSelection = (techId) => {
        setSelectedTech(prev => {
            if (prev.includes(techId)) {
                return prev.filter(id => id !== techId);
            } else {
                return [...prev, techId];
            }
        });
    };
    
    const handleSelectAll = () => {
        if (selectedTech.length === technologies.length) {
            setSelectedTech([]);
        } else {
            setSelectedTech(technologies.map(tech => tech.id));
        }
    };

    const handleSetDeadline = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const updatedTechnologies = technologies.map(tech => {
                if (selectedTech.includes(tech.id)) {
                    return {
                        ...tech,
                        deadline: deadline,
                        status: 'in-progress'
                    };
                }
                return tech;
            });

            setTechnologies(updatedTechnologies);
            localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
            
            showNotification(`Дедлайн установлен для ${selectedTech.length} технологий`, 'success');
            
            setSelectedTech([]);
            setDeadline('');
        }
    };

    const handleRemoveDeadline = (techId) => {
        const updatedTechnologies = technologies.map(tech => {
            if (tech.id === techId) {
                const { deadline: _, ...rest } = tech;
                return rest;
            }
            return tech;
        });

        setTechnologies(updatedTechnologies);
        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));
        
        showNotification('Дедлайн удален', 'success');
    };

    return (
        <div className="deadline-manager">
            <h1>Управление дедлайнами изучения</h1>

            <div className="deadline-content">
                <form onSubmit={handleSetDeadline} className="deadline-form">
                    <h2>Установить дедлайн для выбранных технологий</h2>

                    <div className="form-group">
                        <label htmlFor="deadline" className="required">
                            Дедлайн изучения
                        </label>
                        <input
                            id="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className={errors.deadline ? 'error' : ''}
                            aria-required="true"
                            aria-invalid={!!errors.deadline}
                            aria-describedby={errors.deadline ? 'deadline-error' : undefined}
                        />
                        {errors.deadline && (
                            <span id="deadline-error" className="error-message" role="alert">
                                {errors.deadline}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Выберите технологии</label>
                        {errors.selectedTech && (
                            <span className="error-message" role="alert">
                                {errors.selectedTech}
                            </span>
                        )}
                        
                        <div className="tech-selection">
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className="select-all-btn"
                            >
                                {selectedTech.length === technologies.length ? 'Снять все' : 'Выбрать все'}
                            </button>

                            <div className="tech-list">
                                {technologies.map(tech => (
                                    <div key={tech.id} className="tech-checkbox">
                                        <input
                                            type="checkbox"
                                            id={`tech-${tech.id}`}
                                            checked={selectedTech.includes(tech.id)}
                                            onChange={() => handleTechSelection(tech.id)}
                                        />
                                        <label htmlFor={`tech-${tech.id}`}>
                                            {tech.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn-primary"
                        disabled={selectedTech.length === 0 || !deadline}
                    >
                        Установить дедлайн
                    </button>
                </form>

                <div className="deadlines-list">
                    <h2>Текущие дедлайны</h2>
                    {technologies.filter(tech => tech.deadline).length === 0 ? (
                        <p>Нет установленных дедлайнов</p>
                    ) : (
                        <div className="tech-cards">
                            {technologies
                                .filter(tech => tech.deadline)
                                .map(tech => (
                                    <div key={tech.id} className="tech-card">
                                        <h3>{tech.title}</h3>
                                        <p className="deadline">
                                            Дедлайн: <strong>{new Date(tech.deadline).toLocaleDateString()}</strong>
                                        </p>
                                        <p className="category">Категория: {tech.category}</p>
                                        <p className="status">Статус: {tech.status || 'не начато'}</p>
                                        <button
                                            onClick={() => handleRemoveDeadline(tech.id)}
                                            className="btn-remove"
                                            aria-label={`Удалить дедлайн для ${tech.title}`}
                                        >
                                            Удалить дедлайн
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DeadlineManager;