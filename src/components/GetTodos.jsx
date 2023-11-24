import { useContext } from "react";
import TodoContext from "./TodoContext";
import style from "../App.module.css"

const GetTodos = () => {
    const {
        todos,
        newTodo,
        setNewTodo,
        editingTodo,
        setEditingTodo,
        editedTodos,
        setEditedTodos,
        searchQuery,
        addTodo,
        editTodo,
        deleteTodo,
        handleSearch,
        toggleSorting,
        isSorted
    } = useContext(TodoContext);

    return (
        <>
            <h1>Список дел</h1>
            <button
                className={style.todoListItemButton}
                onClick={toggleSorting}>
                {isSorted ? "Отключить сортировку" : "Включить сортировку"}
            </button>

            <div>
                <input
                    className={style.todoListItemInput}
                    type="text"
                    placeholder="Поиск дела"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <ul className={style.todoList}>
                {todos.map((todo) => (
                    <li
                        className={`${style.todoListItem} ${todo.title && todo.title.includes(searchQuery) && searchQuery !== "" ? style.highlight : ""
                            }`}
                        key={todo.id}
                    >
                        {editingTodo === todo.id ? (
                            <div>
                                <input
                                    className={style.todoListItemInput}
                                    type="text"
                                    value={editedTodos[todo.id] || todo.title}
                                    onChange={(e) => {
                                        const newEditedTodos = { ...editedTodos };
                                        newEditedTodos[todo.id] = e.target.value;
                                        setEditedTodos(newEditedTodos);
                                    }}
                                />
                                <button onClick={() => editTodo(todo.id)}>
                                    Ок
                                </button>
                            </div>
                        ) : (
                            <div className={style.wrapper}>
                                {todo.title}
                                <div className={style.innerWrapper}>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => setEditingTodo(todo.id)}>Редактировать</button>
                                    <button
                                        className={style.todoListItemButton}
                                        onClick={() => deleteTodo(todo.id)}>Удалить</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    className={style.todoListItemInput}
                    type="text"
                    placeholder="Добавить новое дело"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                    className={style.todoListItemButton}
                    onClick={addTodo}>Добавить</button>
            </div>
        </>
    );
};

export default GetTodos;
