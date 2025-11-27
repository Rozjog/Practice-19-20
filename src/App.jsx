import './App.css';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import useTechnologies from './components/useTechnologies';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import Statistics from './components/Statistics';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';
import Navigation from './components/Navigation';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ApiTechnologyImporter from './components/ApiTechnologyImporter';
import TechnologySearch from './components/TechnologySearch';

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    pickRandomTech,
    addTechnology,
    progress
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = localStorage.getItem('username') || '';
    setIsLoggedIn(loggedIn);
    setUsername(user);
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const filteredTechnologies = technologies.filter(tech => {
    const searchMatch = searchQuery === '' ||
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatch = activeFilter === 'all' || tech.status === activeFilter;

    return searchMatch && statusMatch;
  });

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Navigation
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={
            <div className="main-container">
              <div className="page-content">
                <h1>Дорожная карта изучения технологий</h1>

                <Statistics technologies={technologies} />
                <ProgressHeader technologies={technologies} progress={progress} />

                <TechnologySearch
                  onSearch={setSearchQuery}
                  searchQuery={searchQuery}
                />

                <ApiTechnologyImporter addTechnology={addTechnology} />

                <QuickActions
                  markAllCompleted={markAllCompleted}
                  resetAllStatuses={resetAllStatuses}
                  pickRandomTech={pickRandomTech}
                  technologies={technologies}
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
            </div>
          } />

          <Route path="/technologies" element={<TechnologyList technologies={technologies} />} />
          <Route path="/technology/:id" element={
            <TechnologyDetail
              technologies={technologies}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          } />
          <Route path="/statistics" element={<Statistics technologies={technologies} />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route path="/settings" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings onLogout={handleLogout} username={username} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;