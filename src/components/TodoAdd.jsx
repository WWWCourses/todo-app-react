import React, {useState} from 'react';

const TodoAdd = ({addTodo}) => {
    const [value, setValue] = useState('')

    const onChangeHandler = (e)=>{
        setValue(e.target.value)
    }

    const onClickHandler = (e)=>{
        addTodo(value)
    }

    return (
        <React.Fragment>
            <div className="todo-add">
				<input
                    value={value}
                    type="text"
                    autoFocus
                    placeholder="add new todo ..."
                    onChange={onChangeHandler}
                />
				<button
                    className="todo-add-btn"
                    type="button"
                    onClick={onClickHandler}
                >
                Add
                </button>
			</div>
        </React.Fragment>
    );
};

export default TodoAdd;