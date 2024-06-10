import {createContext,useContext} from 'react'

export const TodoContext=createContext({
    todos:{ },
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    addTodo:(todo)=>{},
    toggleTodo:(id)=>{}
})

export const TodoContextProvider=TodoContext.Provider

export default function useTodo() {
    return useContext(TodoContext)
}