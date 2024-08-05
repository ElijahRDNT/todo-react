import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import './TodoWrapper.css'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import Button from 'react-bootstrap/Button';
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
    const completedTasks = todos.filter(todo => todo.completed); //filters completed tasks, creates an array of it
    console.log(completedTasks);
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
    if (task.length !== 0){
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  }};

  const noTasksMessage = todos.length === 0 ? '— Nothing To Show —' : '';

  const deleteCompletedTasks = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Determine if there are completed tasks
  const hasCompletedTasks = todos.some(todo => todo.completed);

  return (
    <div className='TodoWrapper' style={{display: "flex",flexDirection: "column", border: "1px solid #5E1B89"}}>
      <div style={{ display: "flex", alignItems: "center", marginLeft:"10px", paddingBottom:"15px"}}>
        <FontAwesomeIcon icon={faClipboard} className='todo-icon' />
        <h1 style={{ margin: 0 }}>ToDo List</h1>
      </div>
        <TodoForm addTodo={addTodo} />
        {hasCompletedTasks && (
        <Button variant="primary" size='sm' onClick={deleteCompletedTasks} className='del-completed'>
          DELETE COMPLETED TASKS
        </Button>
        )}
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
        <h5>{noTasksMessage}</h5>
    </div>
  )
}
