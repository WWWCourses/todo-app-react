import React, { createContext,useContext, useState, useEffect} from "react";

const TodosContext = createContext();


function TodosContextProvider({ children }) {
	const APIRoot = 'http://localhost:3000/todos';

	// Initialize state
	const [todos, setTodos] = useState([]);

	// Fetch data
	useEffect(()=>{
		// Use fetch API to set initial state,
		fetch(APIRoot)
			.then(response => response.json())
			.then(data => {
				console.log(`TODOS FETCHED:`, data);
				setTodos(data);
			}
		)
		.catch( err=>console.error(`Ups, ${err}`) );
	}, []); // we must pass empty array to tel React to use our effect only once (on mount and unmount).


	const addTodo = (todoTitle)=>{
		console.log(`todos in addTodo`, todos);
		// create the new todo object
		const newTodo = {
			"title": todoTitle,
			"completed": false
		};


		//// change server state:
		fetch(APIRoot, {
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
			// change local state
			setTodos([...todos,data])
		})
		.catch( err=>console.error(`Ups, error: ${err}`) );
	}

	const removeTodo = (todoId)=>{
		//// change server state:
		fetch(`${APIRoot}/${todoId}`,{
			method: 'DELETE'
		})
		.then(response=>{
			if (!response.ok) {
				throw Error(response.statusText);
			}
			// change local state:
			const filteredTodos = todos.filter(todo=> todo.id !== todoId)
			setTodos(filteredTodos)
		})
		.catch( err=>console.error(`Ups, ${err}`) );
	}

	const toggleComplete = (todoId, todoCompleted)=>{
		//// change server state:
		fetch(`${APIRoot}/${todoId}`,{
			method: 'PATCH',
			body: JSON.stringify({
				"completed": !todoCompleted
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		.then(response=>{
			if (!response.ok) {
				throw Error(response.statusText);
			}
			// change local state:
			const todosCompleted = todos.map(
				todo=>todo.id===todoId ? {...todo,completed:!todo.completed} : {...todo}
			);
			setTodos(todosCompleted);
		})
		.catch( err=>console.error(`Ups, ${err}`) );
	}

	return (
	  <TodosContext.Provider value={{todos, addTodo, removeTodo, toggleComplete}}>
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

export {TodosContextProvider, useTodosContext}