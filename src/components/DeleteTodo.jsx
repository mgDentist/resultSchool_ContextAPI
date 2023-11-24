import { useContext } from 'react';
import TodoContext from './TodoContext';
import style from "../App.module.css";

const DeleteTodo = ({ id }) => {
    const { deleteTodo } = useContext(TodoContext);

    return (
        <button
            className={style.todoListItemButton}
            onClick={() => deleteTodo(id)}>Удалить</button>
    );
};

export default DeleteTodo;
