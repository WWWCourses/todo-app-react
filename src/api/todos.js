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

        // TODO-DONE: тази декларация (const todo) заради "hoisting"-a се изпълнява в началото и "засенчва" todo параметъра.  Затова хвърляше грешка ("ReferenceError: Cannot access 'todo' before initialization") на 25 ред.
        // const todo = await response.json();
        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

// TESTING...
const gettodo_tmps = async ()=>{
    const todos = await fetchTodos();
    console.dir(todos);
}


const addTodo = async ()=>{
    const newTodo = {
        "title":"New Todo",
        "completed": false,
    };
    const todo = await postTodo(newTodo);
    console.dir(todo);
}

addTodo()

export {fetchTodos, postTodo}
