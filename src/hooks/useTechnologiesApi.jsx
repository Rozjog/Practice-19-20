// hooks/useTechnologiesApi.js
import { useState, useEffect, useCallback } from 'react';

function useTechnologiesApi() {
    const [apiTechnologies, setApiTechnologies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Функция для преобразования данных API в формат карточек технологий
    const transformApiDataToTechnologies = (apiData) => {
        const categories = ['React', 'Hooks', 'JavaScript', 'CSS', 'Backend'];
        const difficulties = ['beginner', 'intermediate', 'advanced'];
        
        return apiData.map((item, index) => ({
            id: item.id + 1000, // Добавляем 1000 чтобы избежать конфликта с существующими ID
            title: item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title,
            description: item.body.length > 100 ? item.body.substring(0, 100) + '...' : item.body,
            status: 'not-started',
            notes: '',
            category: categories[index % categories.length],
            difficulty: difficulties[index % difficulties.length],
            resources: [
                `https://jsonplaceholder.typicode.com/posts/${item.id}`,
                'https://developer.mozilla.org'
            ],
            userId: item.userId,
            createdAt: new Date().toISOString()
        }));
    };

    // Загрузка технологий из API
    const fetchTechnologiesFromApi = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiData = await response.json();
            const transformedTechnologies = transformApiDataToTechnologies(apiData);
            
            setApiTechnologies(transformedTechnologies);
            return transformedTechnologies;

        } catch (err) {
            setError('Не удалось загрузить технологии из API');
            console.error('Ошибка загрузки:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Добавление технологий из API в основное хранилище
    const addApiTechnologies = useCallback(async (addTechnologyFunc) => {
        try {
            if (apiTechnologies.length === 0) {
                await fetchTechnologiesFromApi();
            }
            
            const technologiesToAdd = apiTechnologies.length > 0 
                ? apiTechnologies 
                : await fetchTechnologiesFromApi();

            // Добавляем каждую технологию в основное хранилище
            const addedTechnologies = [];
            for (const tech of technologiesToAdd) {
                const addedTech = await addTechnologyFunc({
                    title: tech.title,
                    description: tech.description,
                    category: tech.category,
                    difficulty: tech.difficulty,
                    resources: tech.resources
                });
                addedTechnologies.push(addedTech);
            }

            return addedTechnologies;

        } catch (err) {
            throw new Error('Не удалось добавить технологии из API');
        }
    }, [apiTechnologies, fetchTechnologiesFromApi]);

    return {
        apiTechnologies,
        loading,
        error,
        fetchTechnologiesFromApi,
        addApiTechnologies,
        refetch: fetchTechnologiesFromApi
    };
}

export default useTechnologiesApi;