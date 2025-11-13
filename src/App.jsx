import './App.css';
import { useState } from 'react';
import useTechnologies from './components/useTechnologies';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';

function App() {
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    markAllCompleted, 
    resetAllStatuses,
    pickRandomTech,
    progress 
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechnologies = technologies.filter(tech => {
    const searchMatch = searchQuery === '' ||
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatch = activeFilter === 'all' || tech.status === activeFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="App">
      <h1>Дорожная карта изучения технологий</h1>

      <ProgressHeader technologies={technologies} progress={progress} />
      <Statistics technologies={technologies} />

      {/* Простой поиск */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Поиск по технологиям..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>Найдено: {filteredTechnologies.length}</div>
      </div>

      <QuickActions
        markAllCompleted={markAllCompleted}
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
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;