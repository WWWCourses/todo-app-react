// src/contexts/todosContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const TodosContext = createContext();

function TodosContextProvider({ children }) {
    const APIRoot = 'http://localhost:3333/todos';
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch(APIRoot)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log(`TODOS FETCHED:`, data);
                setTodos(data);
            })
            .catch(err => console.error(`Ups, ${err}`));
    }, []);

    const addTodo = (todoTitle) => {
        console.log(`todos in addTodo`, todos);
        const newTodo = {
            title: todoTitle,
            completed: false
        };

        return fetch(APIRoot, {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setTodos([...todos, data]);
        })
        .catch(err => console.error(`Ups, error: ${err}`));
    };

    const removeTodo = (todoId) => {
        return fetch(`${APIRoot}/${todoId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const filteredTodos = todos.filter(todo => todo.id !== todoId);
            setTodos(filteredTodos);
        })
        .catch(err => console.error(`Ups, ${err}`));
    };

    const toggleComplete = (todoId, todoCompleted) => {
        return fetch(`${APIRoot}/${todoId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !todoCompleted
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const todosCompleted = todos.map(
                todo => todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            );
            setTodos(todosCompleted);
        })
        .catch(err => console.error(`Ups, ${err}`));
    };

    const updateTodo = (id, newTitle) => {
        console.log('newTitle', newTitle);
        const updatedTodo = {
            title: newTitle
        };

        // We need to return promise, to ensure that EditTodo updates the state before navigation
        return fetch(`${APIRoot}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            );
            setTodos(updatedTodos);
        })
        .catch(err => console.error(`Ups, ${err}`));
    };

    return (
        <TodosContext.Provider value={{ todos, addTodo, removeTodo, toggleComplete, updateTodo }}>
            {children}
        </TodosContext.Provider>
    );
}

function useTodosContext() {
    const context = useContext(TodosContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

export { TodosContextProvider, useTodosContext };
