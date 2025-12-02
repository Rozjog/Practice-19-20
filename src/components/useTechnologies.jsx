import { useState, useEffect } from 'react';

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'completed',
        notes: 'Заметка сохранена (4 символов)',
        category: 'React',
        difficulty: 'beginner',
        resources: []
    },
    {
        id: 2,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX',
        status: 'completed',
        notes: 'Записывайте сюда важные моменты...',
        category: 'React',
        difficulty: 'beginner',
        resources: []
    },
    {
        id: 3,
        title: 'useState Hook',
        description: 'Работа с состоянием компонентов',
        status: 'in-progress',
        notes: '',
        category: 'Hooks',
        difficulty: 'intermediate',
        resources: []
    },
    {
        id: 4,
        title: 'Props and Components',
        description: 'Передача данных между компонентами',
        status: 'not-started',
        notes: '',
        category: 'React',
        difficulty: 'beginner',
        resources: []
    },
    {
        id: 5,
        title: 'useEffect Hook',
        description: 'Работа с побочными эффектами',
        status: 'not-started',
        notes: '',
        category: 'Hooks',
        difficulty: 'intermediate',
        resources: []
    },
    {
        id: 6,
        title: 'React Router',
        description: 'Маршрутизация в React приложениях',
        status: 'not-started',
        notes: '',
        category: 'Routing',
        difficulty: 'intermediate',
        resources: []
    }
];

function useTechnologies() {
    const [technologies, setTechnologies] = useState(() => {
        try {
            const saved = localStorage.getItem('technologies');
            return saved ? JSON.parse(saved) : initialTechnologies;
        } catch (error) {
            console.error('Ошибка загрузки из localStorage:', error);
            return initialTechnologies;
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('technologies', JSON.stringify(technologies));
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
        }
    }, [technologies]);

    const addTechnology = async (techData) => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));

            const newTech = {
                id: Date.now(),
                ...techData,
                status: techData.status || 'not-started',
                notes: techData.notes || '',
                createdAt: new Date().toISOString()
            };

            setTechnologies(prev => [...prev, newTech]);
            return newTech;

        } catch (err) {
            setError('Не удалось добавить технологию');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchTechnologies = async () => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Загрузка технологий завершена');

        } catch (err) {
            setError('Ошибка загрузки технологий');
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const updateStatus = (techId, newStatus = null) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === techId ? {
                ...tech,
                status: newStatus !== null ? newStatus :
                    (tech.status === 'not-started' ? 'in-progress' :
                        tech.status === 'in-progress' ? 'completed' : 'not-started')
            } : tech
        ));
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === techId ? { ...tech, notes: newNotes } : tech
        ));
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    const markAllCompleted = () => {
        setTechnologies(prev => prev.map(tech => ({
            ...tech,
            status: 'completed'
        })));
    };

    const resetAllStatuses = () => {
        setTechnologies(prev => prev.map(tech => ({
            ...tech,
            status: 'not-started'
        })));
    };

    const pickRandomTech = () => {
        const notStartedTech = technologies.filter(tech => tech.status === 'not-started');
        if (notStartedTech.length === 0) {
            alert('Все технологии начаты или завершены!');
            return null;
        }
        const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
        updateStatus(randomTech.id);
        return randomTech;
    };

    const deleteTechnology = (techId) => {
        setTechnologies(prev => prev.filter(tech => tech.id !== techId));
    };

    const updateTechnology = (techId, updatedData) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === techId ? { ...tech, ...updatedData } : tech
        ));
    };

    const searchTechnologies = (query) => {
        if (!query.trim()) return technologies;

        return technologies.filter(tech =>
            tech.title.toLowerCase().includes(query.toLowerCase()) ||
            tech.description.toLowerCase().includes(query.toLowerCase()) ||
            tech.category.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filterByStatus = (status) => {
        if (status === 'all') return technologies;
        return technologies.filter(tech => tech.status === status);
    };

    const filterByCategory = (category) => {
        if (category === 'all') return technologies;
        return technologies.filter(tech => tech.category === category);
    };

    const getStatistics = () => {
        const total = technologies.length;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
        const notStarted = technologies.filter(tech => tech.status === 'not-started').length;

        const categories = [...new Set(technologies.map(tech => tech.category))];
        const difficulties = {
            beginner: technologies.filter(tech => tech.difficulty === 'beginner').length,
            intermediate: technologies.filter(tech => tech.difficulty === 'intermediate').length,
            advanced: technologies.filter(tech => tech.difficulty === 'advanced').length
        };

        return {
            total,
            completed,
            inProgress,
            notStarted,
            categories,
            difficulties,
            progressPercentage: calculateProgress()
        };
    };

    const addResourceToTechnology = (techId, resource) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === techId
                ? {
                    ...tech,
                    resources: [...(tech.resources || []), resource]
                }
                : tech
        ));
    };

    const removeResourceFromTechnology = (techId, resourceIndex) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === techId
                ? {
                    ...tech,
                    resources: tech.resources.filter((_, index) => index !== resourceIndex)
                }
                : tech
        ));
    };

    const resetToInitial = () => {
        setTechnologies(initialTechnologies);
    };

    return {
        technologies,
        loading,
        error,

        addTechnology,
        updateStatus,
        updateNotes,
        deleteTechnology,
        updateTechnology,

        markAllCompleted,
        resetAllStatuses,
        pickRandomTech,
        resetToInitial,

        searchTechnologies,
        filterByStatus,
        filterByCategory,

        addResourceToTechnology,
        removeResourceFromTechnology,

        getStatistics,
        progress: calculateProgress(),

        refetch: fetchTechnologies
    };
}

export default useTechnologies;