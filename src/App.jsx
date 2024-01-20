import { useState } from 'react'
import './App.css'
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0)
  const appTitle = 'Simple Todo App'
  return (
    <div className="page">
      <Header appTitle={appTitle}/>

    </div>


  )
}

export default App
