import { useState, useEffect, useRef } from 'react';

function TechnologySearch({ onSearch, searchQuery }) {
    const [localSearch, setLocalSearch] = useState(searchQuery);
    const [loading, setLoading] = useState(false); 
    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setLocalSearch(value);
        setLoading(true);

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            onSearch(value);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <div className="technology-search">
            <h3>Поиск технологий</h3>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Введите название технологии..."
                    value={localSearch}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {loading && <span className="search-loading"> ⏳ </span>}
                {searchQuery && !loading && (
                    <button 
                        onClick={() => {
                            setLocalSearch('');
                            onSearch('');
                        }}
                        className="clear-search"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}

export default TechnologySearch;