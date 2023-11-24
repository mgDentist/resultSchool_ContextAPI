import { useContext } from 'react';
import TodoContext from './TodoContext';
import EditTodo from './EditTodo';
import DeleteTodo from './DeleteTodo';
import style from "../App.module.css";

const TodoList = () => {
    const { todos, searchQuery } = useContext(TodoContext);

    return (
        <ul className={style.todoList}>
            {todos.filter(todo => todo.title && todo.title.includes(searchQuery)).map((todo) => (
                <li
                    className={style.todoListItem}
                    key={todo.id}>
                    <EditTodo todo={todo} />
                    <DeleteTodo id={todo.id} />
                </li>
            ))}
        </ul>

    );
};

export default TodoList;
