import React from 'react';
import { useTodosContext } from "../contexts/todosContext";
import TodoItem from "./TodoItem";


const TodoList = (props) => {
	const {todos} = useTodosContext()

	return (
		<ul className="todo-list-items">
			{todos.map( todo => <TodoItem todo={todo} key={todo.id}/>)}
		</ul>
	)
}

export default TodoList;