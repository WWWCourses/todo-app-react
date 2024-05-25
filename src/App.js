import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header  from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
// import TodosCount from "./components/TodosCount";
import { TodosContextProvider } from "./todosContext";

const App = ()=> {
	const appName = 'Simple Todo App';
	return (
		<Router>
			<div className="page">
				<Header appName={appName}/>
				<main className="todo-add">
				<TodosContextProvider>
					<Routes>
						<Route path="/" element={<>
								<AddTodo />
								<TodoList />
						</>} />
						<Route path="/edit/:id" element={<EditTodo />} />
					</Routes>
					</TodosContextProvider>
				</main>
			</div>
		</Router>
	)
}

export default App
