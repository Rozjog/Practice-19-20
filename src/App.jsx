import './App.css';
import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';

function App() {

  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started',
      category: 'React'
    },
    {
      id: 2,
      title: 'JSX Syntax',
      description: 'Освоение синтаксиса JSX', 
      status: 'not-started',
      category: 'React'
    },
    {
      id: 3,
      title: 'useState Hook',
      description: 'Работа с состоянием компонентов',
      status: 'in-progress',
      category: 'Hooks'
    },
    {
      id: 4,
      title: 'Props and Components',
      description: 'Передача данных между компонентами',
      status: 'completed',
      category: 'React'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const updateTechnologyStatus = (id) => {
    setTechnologies(prev => prev.map(tech => 
      tech.id === id ? {
        ...tech,
        status: tech.status === 'not-started' ? 'in-progress' : 
                tech.status === 'in-progress' ? 'completed' : 'not-started'
      } : tech
    ));
  };

  const markAllAsCompleted = () => {
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
    updateTechnologyStatus(randomTech.id);
  };

  const filteredTechnologies = technologies.filter(tech => {
    if (activeFilter === 'all') return true;
    return tech.status === activeFilter;
  });

  return (
    <div className="App">
      <h1>Дорожная карта изучения технологий</h1>
      
      <ProgressHeader technologies={technologies} />
      <Statistics technologies={technologies} />
      
      <QuickActions 
        markAllCompleted={markAllAsCompleted}
        resetAllStatuses={resetAllStatuses}
        pickRandomTech={pickRandomTech}
      />
      
      <FilterButtons 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />

      <div className="technologies-grid">
        {filteredTechnologies.map(tech => (
          <TechnologyCard 
            key={tech.id}
            {...tech}
            onStatusChange={updateTechnologyStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;