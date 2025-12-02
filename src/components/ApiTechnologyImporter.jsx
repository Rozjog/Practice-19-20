import { useState } from 'react';
import { useNotification } from './NotificationContent';

function ApiTechnologyImporter({ addTechnology, resetToInitial }) {
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const importFromGitHub = async () => {
        try {
            setLoading(true);

            const response = await fetch('https://api.github.com/search/repositories?q=language:javascript&sort=stars&per_page=4');

            if (!response.ok) {
                throw new Error('Ошибка загрузки данных с GitHub');
            }

            const data = await response.json();

            const technologiesToAdd = data.items.map((repo, index) => {
                const categories = ['Frontend', 'Backend', 'Tools', 'Libraries'];
                const difficulties = ['beginner', 'intermediate', 'advanced'];

                return {
                    title: repo.name,
                    description: repo.description || 'Описание отсутствует',
                    category: categories[index % categories.length],
                    difficulty: difficulties[index % difficulties.length],
                    resources: [repo.html_url, `${repo.html_url}/issues`],
                    status: 'not-started',
                    notes: ''
                };
            });

            for (const techData of technologiesToAdd) {
                await addTechnology(techData);
            }
            showNotification(`Успешно добавлено ${technologiesToAdd.length} технологий!`, 'success');

        } catch (error) {
            console.error('Ошибка импорта:', error);
            showNotification(`Ошибка: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetToInitial = () => {
        if (window.confirm('Вы уверены, что хотите сбросить все данные к начальному состоянию? Это действие нельзя отменить.')) {
            resetToInitial();
            showNotification('Данные сброшены к начальному состоянию', 'info');
        }
    };

    return (
        <div className="api-importer">
            <h3>Импорт технологий из GitHub</h3>

            <button
                onClick={importFromGitHub}
                disabled={loading}
                className="import-button"
            >
                {loading ? 'Загрузка...' : 'Добавить технологии из GitHub'}
            </button>

            <button
                onClick={handleResetToInitial}
                className="reset-button"
            >
                Сбросить к начальным данным
            </button>
        </div>
    );
}

export default ApiTechnologyImporter;