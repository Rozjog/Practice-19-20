import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, username, onLogout, toggleTheme, darkMode }) {
    const location = useLocation();

    return (
        <nav className="navigation">
            <div className="nav-content">
                {/* <div className="nav-brand">
                    <Link to="/">
                        <h2>💻 Трекер технологий</h2>
                    </Link>
                </div> */}
                
                <div className="nav-right">
                    
                    
                    <ul className="nav-menu">
                        <li>
                            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                                Главная
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/technologies" className={location.pathname === '/technologies' ? 'active' : ''}>
                                Все технологии
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>
                                Статистика
                            </Link>
                        </li>
                        <li>
                            <Link to="/deadlines" className={location.pathname === '/deadlines' ? 'active' : ''}>
                                Управление дедлайнами
                            </Link>
                        </li>

                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
                                        Настройки
                                    </Link>
                                </li>
                                <li className="user-info">
                                    <span className="username-text">Привет, {username}!</span>
                                    <button onClick={onLogout} className="logout-btn">
                                        Выйти
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                                    Войти
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;