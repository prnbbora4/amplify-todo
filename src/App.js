/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { createTodo } from './graphql/mutations'
import { deleteTodo } from './graphql/mutations'
import { updateTodo } from './graphql/mutations'
import { getTodo, listTodos } from './graphql/queries'
import './App.css'
import Modal from './Components/Modal'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);


const initialState = { name: '', description: '', location: '' }

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  // set the ID from map
  const [todoId, setTodoId] = useState(null)
  // button toogle in updatedItem
  const [toggleSubmit, setToggleSubmit] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [todos])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, { input: todo }))

    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function delTodo(id) {
    try {
      const getTodo = todos.filter((data) => data.id === id)[0]
      console.log("getTodo for delete", getTodo);
      const response = await API.graphql(graphqlOperation(deleteTodo, { id: getTodo.id }))
      console.log("Deleted", response);


    } catch (error) {
      console.log('error deleting todo:', error)
    }
  }

  function myFunction() {
    window.confirm("are you sure ?");
  }

  async function upDateTodo(id) {
    try {
      const getTodo2 = todos.filter((data) => data.id === id)[0]
      console.log("getTodo for update", getTodo2);
      setFormState(getTodo2)
      setToggleSubmit(false)

      // document.getElementById("btn").innerHTML = "Update Todo"

    } catch (error) {
      console.log('error updating todo', error);
    }
  }

  async function upTodo(id) {
    try {
      const getTodo1 = todos.filter((data) => data.id === id)[0]
      console.log("getTodo for update btn", getTodo1);
      if (!formState.name || !formState.description || !formState.location) return
      const todo = { ...formState }
      // setTodos([...todos, todo])
      console.log("after edit", todo);
      setFormState(initialState)
      const response = await API.graphql(graphqlOperation(updateTodo, { id: todo.id, description: todo.description, location: todo.location }))
      console.log("Updated btn", response);
      setToggleSubmit(true)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container box'>
      <div className='centertext'>
        <h2>Amplify Todos</h2>
        <input className='input is-primary'
          onChange={event => setInput('name', event.target.value)}
          value={formState.name}
          placeholder="Name"
          id="txt"
        />
        <input className='input is-primary'
          onChange={event => setInput('description', event.target.value)}
          value={formState.description}
          placeholder="Description"
          id="txt1"
        />
        <input className='input is-primary'
          onChange={event => setInput('location', event.target.value)}
          value={formState.location}
          placeholder="Location"
          id="txt2"
        />

        {toggleSubmit ?
          <button className='openModalBtn' onClick={addTodo}>Create Todo</button>
          :
          <button className='openModalBtn' onClick={() => { upTodo(todoId) }}>Update Todo</button>
        }
        {
          todos.map((todo, index) => (
            <div className='box todos' key={todo.id ? todo.id : index} >
              <h1 >{todo.name} </h1>
              <p >{todo.description}</p>
              <p >{todo.location}</p>
              <button className='openModalBtn' onClick={() => { setModalOpen(true); setTodoId(todo.id)}}>Delete</button>
              <button className='openModalBtn' onClick={() => { upDateTodo(todo.id); setTodoId(todo.id) }}>Update</button>
            </div>
          ))
        }
        {modalOpen && <Modal setOpenModal={setModalOpen} todoId={todoId} delTodo={delTodo(Id)}/>}

      </div>
    </div>
  )
}



export default withAuthenticator(App)