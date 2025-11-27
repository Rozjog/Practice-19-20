import { useState } from 'react';

function ApiTechnologyImporter({ addTechnology }) {
    const [loading, setLoading] = useState(false);
    const [importedCount, setImportedCount] = useState(0);

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

            setImportedCount(technologiesToAdd.length);

            setTimeout(() => setImportedCount(0), 3000);

        } catch (error) {
            console.error('Ошибка импорта:', error);
            alert(`Ошибка: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="api-importer">
            <h3>Импорт технологий из GitHub</h3>
            
            {/* <div className="import-info">
                <p>
                    <strong>Источник:</strong> GitHub API<br />
                    <strong>Данные:</strong> Популярные JavaScript проекты<br />
                    <strong>Формат:</strong> Полнофункциональные карточки
                </p>
            </div> */}

            <button
                onClick={importFromGitHub}
                disabled={loading}
                className="import-button"
            >
                {loading ? 'Загрузка...' : 'Добавить технологии из GitHub'}
            </button>

            {importedCount > 0 && (
                <div className="success-message">
                    Успешно добавлено {importedCount} технологий!
                </div>
            )}
        </div>
    );
}

export default ApiTechnologyImporter;