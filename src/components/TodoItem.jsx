// src/components/TodoItem.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useTodosContext } from '../contexts/todosContext';

const TodoItem = ({ todo }) => {
  const { removeTodo, toggleComplete } = useTodosContext();

  const handleRemove = () => {
    removeTodo(todo.id);
  };

  const handleToggleComplete = () => {
    toggleComplete(todo.id, todo.completed);
  };

  return (
    <li>
      <span className="todoID">{todo.id}.</span>
      <span
        className={"title " + (todo.completed ? "completed" : "")}
        onClick={handleToggleComplete}
      >
        {todo.title}
      </span>
      <div className="todo-edit">
        <Link to={`/edit/${todo.id}`}>
          <FontAwesomeIcon icon="pencil-alt" />
        </Link>
      </div>
      <div className="todo-remove" onClick={handleRemove}>
        <FontAwesomeIcon icon={['far', 'trash-alt']} />
      </div>
      <div className="todo-toggle-complete" onClick={handleToggleComplete}>
		<FontAwesomeIcon icon={todo.completed ? 'check-square' : ['far', 'square']} />
      </div>
    </li>
  );
};

export default TodoItem;
