// src/components/EditTodo.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodosContext } from '../contexts/todosContext';
import "../styles/EditTodo.css/";

const EditTodo = () => {
    const { id } = useParams();
    const todoId = parseInt(id, 10);
    const navigate = useNavigate();
    const { todos, updateTodo } = useTodosContext();
    const todo = todos.find(todo => todo.id === todoId);
    const [text, setText] = useState('');


    useEffect(() => {
        if (todo && text !== todo.title) {
            setText(todo.title);
        } else if (todos.length > 0 && !todo) {
            console.error(`Todo with id ${todoId} not found`);
            navigate('/');
        }
    }, [todo, todoId]);

    const handleSave = () => {
        updateTodo(todoId, text)
            .then(() => navigate('/'))
            .catch(err => console.error('Failed to update todo', err));
    };

    return (
        <div className="edit-todo-container">
            <h1>Edit Todo</h1>
            <input
                type="text"
                value={text}
                autoFocus
                onChange={e => setText(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    )
};

export default EditTodo;
