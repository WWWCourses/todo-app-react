import React from 'react';
import TodoItem from "./TodoItem";

const TodoList = (props) => {
	return (
		<ul className="todo-list-items">
			{props.todos.map( todo => <TodoItem
								todo={todo}
								key={todo.id}
								removeTodo={props.removeTodo}
								toggleComplete={props.toggleComplete} />)
			}
		</ul>
	)
}

export default TodoList;