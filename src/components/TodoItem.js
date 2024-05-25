import React from 'react';
import { Link } from 'react-router-dom';
import { useTodosContext } from "../todosContext";
import EditTodo from './EditTodo';

const TodoItem = ({todo}) => {
	const {removeTodo,toggleComplete} = useTodosContext()

	const handleRemove = (e)=>{
		removeTodo(todo.id)
	}

	const handleToggleComplete = (e)=>{
		toggleComplete(todo.id, todo.completed);
	}

	return (
		<li>
			<span className="todoID">{todo.id}.</span>
			<span className={"title "+ (todo.completed ? "completed" : "")} onClick={handleToggleComplete}>{todo.title}</span>
			<div className="todo-edit" onClick={EditTodo}>
			<Link to={`/edit/${todo.id}`}>Edit</Link>
				{/* <i className="fa fa-pencil"></i> */}
			</div>
			<div className="todo-remove" onClick={handleRemove}><i className="far fa-trash-alt"></i></div>
			<div className="todo-togle-complete" onClick={handleToggleComplete}><i className={"far "+(todo.completed ? "fa-check-square":"fa-square")}></i></div>
		</li>
	 );
}

export default TodoItem;