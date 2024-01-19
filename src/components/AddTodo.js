import React, {useState,createRef} from 'react';
import { useTodosContext } from "../todosContext";

const AddTodo = ()=> {
	const [todoTitle, setTodoTitle] = useState('')
	const {addTodo} = useTodosContext()
	const inputRef = createRef()

	const handleChange = (e)=>{
		console.log(e.target.value);
		setTodoTitle(e.target.value)
	}

	const handleClick = (e)=>{
		addTodo(todoTitle)
		// clear and focus the input
		setTodoTitle('')
		inputRef.current.focus()
	}

	return (
		<div className="todo-add">
			<input
				ref = {inputRef}
				name="todoTitle"
				type="text"
				autoFocus
				placeholder="add new todo ..."
				value={todoTitle}
				onChange={handleChange}/>
			<button
				className="todo-add-btn"
				onClick={handleClick}>Add</button>
		</div>
	)
}

export default AddTodo;