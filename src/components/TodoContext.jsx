import { createContext, useState, useEffect } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedTodos, setEditedTodos] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/todos")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("Ошибка получения данных: ", error));
    }, []);

    const addTodo = () => {
        fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: newTodo }),
        })
            .then((response) => response.json())
            .then((data) => {
                setTodos([...todos, data]);
                setNewTodo("");
            })
            .catch((error) => console.error("Ошибка добавления данных: ", error));
    };

    const editTodo = (id) => {
        const updatedTitle = editedTodos[id];

        console.log("Обновленный заголовок: ", updatedTitle); // Добавить логирование

        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: updatedTitle }),
        })
            .then((response) => response.json())
            .then((updatedTodo) => {
                console.log("Обновленная задача с сервера: ", updatedTodo); // Добавить логирование

                const updatedTodos = todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, title: updatedTodo.title };
                    }
                    return todo;
                });

                setTodos(updatedTodos);
                setEditingTodo(null);
            })
            .catch((error) => console.error("Ошибка редактирования данных: ", error));
    };


    const deleteTodo = (id) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setTodos(todos.filter((todo) => todo.id !== id));
            })
            .catch((error) => console.error("Ошибка удаления данных: ", error));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const toggleSorting = () => {
        setIsSorted(!isSorted);
    };

    const sortedTodos = isSorted
        ? [...todos].sort((a, b) => {
            if (!a.title || !b.title) {
                return 0; // Если один из заголовков не определен, оставляем элементы без изменений
            }
            return a.title.localeCompare(b.title);
        })
        : todos;

    const contextValue = {
        todos: sortedTodos,
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
    };

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;
