import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import './TodoWrapper.css'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]) 

  const addTodo = todo => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    };
    setTodos(todos =>[...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false, createdAt: new Date().toLocaleString('en-US', options)}]);
    console.log(todos);
  }

  useEffect(() => {
    if (todos.length === 0) return;
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    setTodos(todos || []);
  }, []);

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (todos.length == 1){
      setTodos([]);
      localStorage.removeItem('todos');
    }
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className='TodoWrapper' style={{display: "inline-block", border: "1px solid #5E1B89"}}>
      <div style={{ display: "flex", alignItems: "center", marginLeft:"10px", paddingBottom:"15px"}}>
        <FontAwesomeIcon icon={faClipboard} style={{ fontSize: "30px", marginRight: "10px", color:"#5E1B89" }} />
        <h1 style={{ margin: 0 }}>ToDo List</h1>
      </div>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo) =>{
          console.log(todo.id);
          return todo.isEditing ? (
            <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
          ) : (
             <Todo task={todo} key={todo.id} 
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}/>
          )
          
        })}
        
    </div>
  )
}
