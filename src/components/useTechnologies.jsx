import { useState, useEffect } from 'react';

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'React'
    },
    {
        id: 2,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX',
        status: 'not-started',
        notes: '',
        category: 'React'
    },
    {
        id: 3,
        title: 'useState Hook',
        description: 'Работа с состоянием компонентов',
        status: 'in-progress',
        notes: '',
        category: 'Hooks'
    },
    {
        id: 4,
        title: 'Props and Components',
        description: 'Передача данных между компонентами',
        status: 'completed',
        notes: '',
        category: 'React'
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

    useEffect(() => {
        try {
            localStorage.setItem('technologies', JSON.stringify(technologies));
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
        }
    }, [technologies]);

    const updateStatus = (techId) => {
        setTechnologies(prev => prev.map(tech =>
            tech.id === techId ? {
                ...tech,
                status: tech.status === 'not-started' ? 'in-progress' :
                    tech.status === 'in-progress' ? 'completed' : 'not-started'
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
            return;
        }
        const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
        updateStatus(randomTech.id);
    };

    return {
        technologies,
        updateStatus,
        updateNotes,
        markAllCompleted,
        resetAllStatuses,
        pickRandomTech,
        progress: calculateProgress()
    };
}

export default useTechnologies;