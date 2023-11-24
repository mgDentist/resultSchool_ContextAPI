import { useContext } from 'react';
import TodoContext from './TodoContext';
import style from "../App.module.css";

const AddTodo = () => {
    const { newTodo, setNewTodo, addTodo } = useContext(TodoContext);

    return (
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
    );
};

export default AddTodo;
