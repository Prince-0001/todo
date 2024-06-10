import React from "react"
import { TodoContextProvider } from "./contexts/TodoContext"
import {useState,useEffect} from 'react'
import Form from "./components/Form";
import TodoItem from "./components/Items";


function App() {

  const [todos,setTodos]= useState([]);

  const addTodo=(todo)=>{
    setTodos((prev)=>[...prev,{id:Date.now(),...todo}])
  }
  
  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((element)=>((element.id===id)?todo:element)))
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((object)=>object.id!==id))
  }

  const toggleTodo=(id)=>{
    setTodos((prev)=>prev.map((element)=>(element.id===id)?{...element,toggle:!element.toggle}:element))
  }

  useEffect(()=>{
    const getTodo=JSON.parse(localStorage.getItem("todos"))
    if(getTodo&&getTodo.length>0){
      setTodos(getTodo)
    }
    
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoContextProvider value={{todos,updateTodo,deleteTodo,addTodo,toggleTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <Form/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=> (
                          <div key={todo.id} className="w-full">
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoContextProvider>
  )
}

export default App
