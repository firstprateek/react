import "./styles.css"
import NewTodoForm from "./NewTodoForm";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";

export default function App() {
  const [todos, setNewTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) return;

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setNewTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false }
      ];
    });
  }

  function toggleTodo(id, completed) {
    setNewTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo, completed
          }
        }
        return todo;
      });
    })
  }

  function deleteTodo(id) {
    setNewTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }
 
  return <>
    <NewTodoForm onSubmit={addTodo}/>
    <h1 className="list">Todo List</h1>
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </ul>
  </>;
}
