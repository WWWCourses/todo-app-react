import React,{useEffect,useState} from 'react';
import './App.css';
import Header  from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import TodosCount from "./components/TodosCount";

const APIRoot = 'http://localhost:9999/todos';


export default ()=> {
	const appName = 'Simple Todo App';
	const [todos, setTodos] = useState([]);

	useEffect(()=>{
		// Use fetch API to set initial state,
		fetch(APIRoot)
			.then(response => response.json())
			.then(data => {
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
		<div className="page">
			<Header appName={appName}/>
			<main className="todo-add">
				<AddTodo addTodo={addTodo}/>
				<TodoList
					todos={todos}
					removeTodo={removeTodo}
					toggleComplete={toggleComplete}/>
				<TodosCount count={todos.length}/>
			</main>
		</div>
	)
}
