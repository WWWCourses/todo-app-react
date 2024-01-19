import React from 'react';
import './App.css';
import Header  from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
// import TodosCount from "./components/TodosCount";
import { TodosContextProvider } from "./todosContext";

const App = ()=> {
	const appName = 'Simple Todo App';
	return (
		<div className="page">
			<Header appName={appName}/>
			<main className="todo-add">
				<TodosContextProvider>
					<AddTodo/>
					<TodoList/>
					{/* <TodosCount/> */}
				</TodosContextProvider>
			</main>
		</div>
	)
}

export default App
