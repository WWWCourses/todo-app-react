const API_ROOT = "http://localhost:3000"

const fetchTodos =  async ()=>{
    try {
        const response = await fetch(`${API_ROOT}/todos`);
        if(!response.ok){
            throw new Error(`HTTP Error: ${response.statu}`)
        }

        const todos = await response.json();
        // console.dir(todos);
        return todos
    } catch (error) {
        console.error(err);
    }
}

const postTodo = async (todo)=>{
    try {
        const response = await fetch(`${API_ROOT}/todos`,{
            method:"POST",
            headers:{
                "Content-type":"application/json; charset=UTF-8",
            },
            body:JSON.stringify(todo)
        });

        if(!response.ok){
            throw new Error(`HTTP Error: ${response.statu}`)
        }

        const todo = await response.json();
        console.dir(todo);
        return todo;
    } catch (err) {
        console.error(err);
    }
}

// TESTING...
const getTodos = async ()=>{
    const todos = await fetchTodos();
    console.dir(todos);
}


const addTodo = async (newTodo)=>{
    const newTodo = {
        "title":"New Todo",
        "completed": false,
    };
    const todo = postTodo(newTodo);
    console.dir(todo);
}

addTodo()

export {fetchTodos, postTodo}
