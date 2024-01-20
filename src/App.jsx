import { useState, useEffect } from 'react'
import './App.css'
import Header from "./components/Header";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";
import {fetchTodos,postTodo} from "./api/todos";


function App() {
  const [todos, setTodos] = useState([])

  const getTodos = async ()=>{
    const todos = await fetchTodos();
    setTodos(todos)
  }

  const addTodo = async (title) =>{
    const newTodo = {
      title : title,
      completed: false
    }

    const todo = await postTodo(newTodo);

    // todos = [...todos, newTodo] DO NOT DO THIS
    setTodos([...todos, newTodo])
  }




  useEffect(()=>{
    getTodos()
  }, [])


  const appTitle = 'Simple Todo App'
  return (
    <div className="page">
      <Header appTitle={appTitle}/>
      <TodoAdd addTodo={addTodo} />
      <TodoList todos={todos}/>
    </div>


  )
}

export default App
