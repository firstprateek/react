import TodoItem from './TodoItem';

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
    return todos.map(todo => <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />);
}