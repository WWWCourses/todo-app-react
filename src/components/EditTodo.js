// src/components/EditTodo.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTodo = ({ todos, setTodos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = todos.find(todo => todo.id === parseInt(id));
  const [text, setText] = useState(todo ? todo.text : '');

  const handleSave = () => {
    const updatedTodos = todos.map(todo =>
      todo.id === parseInt(id) ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
    navigate('/');
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditTodo;
