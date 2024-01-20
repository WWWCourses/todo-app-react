import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import TodoAdd from "./components/TodoAdd";

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) =>{
    const newTodo = {
      title : title,
      completed: false
    }

    // todos = [...todos, newTodo] DO NOT DO THIS
    setTodos([...todos, newTodo])
  }

  const appTitle = 'Simple Todo App'
  return (
    <div className="page">
      <Header appTitle={appTitle}/>
      <TodoAdd addTodo={addTodo} />
    </div>


  )
}

export default App
