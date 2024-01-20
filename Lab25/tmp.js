const API_ROOT = "http://localhost:3000"

const fetchTodos =  async ()=>{
    // fetch(`${API_ROOT}/todos`)
    // .then(response=>{
    //     if(!response.ok){
    //         throw new Error(`HTTP Error: ${response.statu}`)
    //     }
    //     return response.json()
    // })
    // .then(todos=>console.dir(todos))
    // .catch(err=>{
    //     console.error(err);
    // })

    try {
        const response = await fetch(`${API_ROOT}/todos`);
        if(!response.ok){
            throw new Error(`HTTP Error: ${response.statu}`)
        }

        const todos = await response.json();
        console.dir(todos);
    } catch (error) {
        console.error(err);
    }
}

fetchTodos(API_ROOT)