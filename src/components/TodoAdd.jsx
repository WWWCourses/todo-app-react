import React, {useState} from 'react';

const TodoAdd = (props) => {
    return (
        <React.Fragment>
            <div className="todo-add">
				<input type="text" autofocus placeholder="add new todo ...">
				<button className="todo-add-btn" type="button">Add</button>
			</div>
        </React.Fragment>
    );
};

export default TodoAdd;