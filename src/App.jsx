import './App.css';
import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import DeadlineManager from './components/DeadlineManager';
import DataImportExport from './components/DataImportExport';
import { NotificationProvider } from './components/NotificationContent';
import { ThemeProvider } from './components/ThemeChange';

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAllStatuses,
    pickRandomTech,
    resetToInitial,
    addTechnology,
    progress
  } = useTechnologies();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [isBulkEditMode, setIsBulkEditMode] = useState(false);
  const [selectedTech, setSelectedTech] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('');

  console.log('BASE_URL:', import.meta.env.BASE_URL);

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

  const toggleBulkEditMode = () => {
    setIsBulkEditMode(!isBulkEditMode);
    setSelectedTech([]);
    setBulkStatus('');
  };

  const handleTechSelection = (techId) => {
    if (selectedTech.includes(techId)) {
      setSelectedTech(prev => prev.filter(id => id !== techId));
    } else {
      setSelectedTech(prev => [...prev, techId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTech.length === filteredTechnologies.length) {
      setSelectedTech([]);
    } else {
      setSelectedTech(filteredTechnologies.map(tech => tech.id));
    }
  };

  const applyBulkStatus = () => {
    if (selectedTech.length === 0 || !bulkStatus) return;

    selectedTech.forEach(techId => {
      updateStatus(techId, bulkStatus);
    });

    setSelectedTech([]);
    setBulkStatus('');
    setIsBulkEditMode(false);
  };

  const filteredTechnologies = technologies.filter(tech => {
    const searchMatch = searchQuery === '' ||
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatch = activeFilter === 'all' || tech.status === activeFilter;

    return searchMatch && statusMatch;
  });

  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <NotificationProvider>
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
                    <div className="page-header">
                      <h1>Дорожная карта изучения технологий</h1>
                    </div>

                    <Statistics technologies={technologies} />
                    <ProgressHeader technologies={technologies} progress={progress} />

                    <TechnologySearch
                      onSearch={setSearchQuery}
                      searchQuery={searchQuery}
                    />

                    <ApiTechnologyImporter addTechnology={addTechnology} resetToInitial={resetToInitial} />
                    <DataImportExport
                      technologies={technologies}
                      addTechnology={addTechnology}
                    />
                    <button
                      onClick={toggleBulkEditMode}
                      className={`bulk-edit-btn ${isBulkEditMode ? 'active' : ''}`}
                    >
                      {isBulkEditMode ? '✓ Завершить выбор' : '📝 Массовое редактирование'}
                    </button>

                    {isBulkEditMode && (
                      <div className="bulk-edit-panel" role="toolbar" aria-label="Панель массового редактирования">
                        <div className="bulk-info"></div>

                        <div className="bulk-controls">
                          <button
                            type="button"
                            onClick={handleSelectAll}
                            className="btn-secondary"
                          >
                            {selectedTech.length === filteredTechnologies.length ? 'Снять все' : 'Выбрать все'}
                          </button>

                          <select
                            value={bulkStatus}
                            onChange={(e) => setBulkStatus(e.target.value)}
                            className="status-select"
                            aria-label="Выберите новый статус для выбранных технологий"
                          >
                            <option value="">Выберите статус...</option>
                            <option value="not-started">Не начато</option>
                            <option value="in-progress">В процессе</option>
                            <option value="completed">Завершено</option>
                          </select>

                          <button
                            onClick={applyBulkStatus}
                            disabled={selectedTech.length === 0 || !bulkStatus}
                            className="apply-btn"
                          >
                            Применить к {selectedTech.length}
                          </button>

                          <button
                            onClick={toggleBulkEditMode}
                            className="cancel-btn"
                          >
                            Отмена
                          </button>
                        </div>
                        <span>Выбрано: <strong>{selectedTech.length}</strong> технологий</span>
                      </div>
                    )}

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
                          isBulkEditMode={isBulkEditMode}
                          isSelected={selectedTech.includes(tech.id)}
                          onSelectionToggle={() => handleTechSelection(tech.id)}
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

              <Route path="/deadlines" element={<DeadlineManager />} />
              <Route path="/statistics" element={
                <div>
                  {console.log('BASE_URL для /statistics:', window.location.pathname)}
                  <Statistics technologies={technologies} />
                </div>
              } />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />

              <Route path="/settings" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Settings onLogout={handleLogout} username={username} />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </NotificationProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App; 