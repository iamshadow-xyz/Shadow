import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })
  const [inputValue, setInputValue] = useState('')
  const [editIndex, setEditIndex] = useState(-1)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      if (editIndex === -1) {
        setTodos([...todos, { text: inputValue.trim(), completed: false }])
      } else {
        const newTodos = [...todos]
        newTodos[editIndex].text = inputValue.trim()
        setTodos(newTodos)
        setEditIndex(-1)
      }
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const toggleTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const editTodo = (index) => {
    setInputValue(todos[index].text)
    setEditIndex(index)
  }

  return (
    <div className="App">
      <h1>Hello, Shadow!</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>{editIndex === -1 ? 'Add' : 'Update'}</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <span className="checkmark"></span>
            </label>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
