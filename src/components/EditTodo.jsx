import { useContext } from 'react';
import TodoContext from './TodoContext';
import style from "../App.module.css";

const EditTodo = ({ todo }) => {
    const { editingTodo, setEditingTodo, editedTodos, setEditedTodos, editTodo } = useContext(TodoContext);

    return (
        editingTodo === todo.id ? (
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
                <button
                    className={style.todoListItemButton}
                    onClick={() => editTodo(todo.id)}>Ок</button>
            </div>
        ) : (
            <div>
                {todo.title}
                <button
                    className={style.todoListItemButton}
                    onClick={() => setEditingTodo(todo.id)}>Редактировать</button>
            </div>
        )
    );
};

export default EditTodo;
