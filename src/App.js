import React from 'react';
import './App.css';
import Header  from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import TodosCount from "./components/TodosCount";

const APIRoot = 'http://localhost:3333/todos';


class App extends React.Component {
	constructor(props){
		super(props)

		this.appName = 'Simple Todo App ';

		this.state = {
			"todos": [],
		}

		this.addTodo = this.addTodo.bind(this);
	}

	componentDidMount(){
		console.log(`componentDidMount - the place to fetch initial data`);
		this.fetchTodos();
	}

	fetchTodos(){
		// Use fetch API to set initial state,
		fetch(APIRoot)
			.then(response => response.json())
			.then(data => {
				this.setState({ todos: data })
			}
		)
		.catch( err=>console.error(`Ups, ${err}`) );
	}

	addTodo = (todoTitle)=>{
		const todos = this.state.todos;

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
			this.setState({"todos": [...todos,data]})
		})
		.catch( err=>console.error(`Ups, error: ${err}`) );
	}

	removeTodo = (todoId)=>{
		//// change server state:
		fetch(`${APIRoot}/${todoId}`,{
			method: 'DELETE'
		})
		.then(response=>{
			if (!response.ok) {
				throw Error(response.statusText);
			}
			// change local state:
			const todos = this.state.todos.filter(todo=> todo.id !== todoId)
			// this.setState({"todos":todos});
			this.setState({todos}); // from ES6
		})
		.catch( err=>console.error(`Ups, ${err}`) );
	}

	toggleComplete = (todoId, todoCompleted)=>{
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
			const todos = this.state.todos.map(
				todo=>todo.id===todoId ? {...todo,completed:!todo.completed} : {...todo}
			);
			this.setState({todos:todos});
		})
		.catch( err=>console.error(`Ups, ${err}`) );
	}

	render(){
		return (
			// JSX syntax
			<div className="page">
				<Header appName={this.appName}/>
				<main className="todo-add">
					<AddTodo addTodo={this.addTodo}/>
					<TodoList
						todos={this.state.todos}
						removeTodo={this.removeTodo}
						toggleComplete={this.toggleComplete}/>
					<TodosCount count={this.state.todos.length}/>
				</main>
			</div>
		)
	}
}

export default App;
