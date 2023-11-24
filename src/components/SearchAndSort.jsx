import { useContext } from 'react';
import TodoContext from './TodoContext';

const SearchAndSort = () => {
    const { searchQuery, handleSearch, toggleSorting, isSorted } = useContext(TodoContext);

    return (
        <div>
            <input
                type="text"
                placeholder="Поиск дела"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <button onClick={toggleSorting}>
                {isSorted ? "Отключить сортировку" : "Включить сортировку"}
            </button>
        </div>
    );
};

export default SearchAndSort;
