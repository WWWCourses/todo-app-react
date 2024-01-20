import React, {useState} from 'react';

const TodoItem = ({todo}) => {
    return (
        <React.Fragment>
            <li data-id={todo.id}>
				<span>{todo.title}</span>
				<div className="removeTodo"><i className="far fa-trash-alt"></i></div>
			</li>
        </React.Fragment>
    );
};

export default TodoItem;