import React from 'react';
import { useTodos } from "../todosContext";
import TodoItem from "./TodoItem";


const TodoList = (props) => {
	const {todos} = useTodos()

	return (
		<ul className="todo-list-items">
			{todos.map( todo => <TodoItem todo={todo} key={todo.id}/>)}
		</ul>
	)
}

export default TodoList;