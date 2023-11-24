import { TodoProvider } from "./components/TodoContext";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import SearchAndSort from "./components/SearchAndSort";
import style from "./App.module.css";

const App = () => {
  return (
    <TodoProvider>
      <div className={style.app}>
        <header className={style.appHeader}>
          <h1>Список дел</h1>
          <SearchAndSort />
        <AddTodo />
        <TodoList />
        </header>
      </div>
    </TodoProvider>
  );
}

export default App;
