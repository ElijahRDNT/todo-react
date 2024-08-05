import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'
import './TodoWrapper.css'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'bootstrap'

uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]) 
  const [allCompleted, setAllCompleted] = useState(false);
  const [deleteAction, setDeleteAction] = useState(null); // To track the delete action

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

  const hasUncheckedTasks = todos.some(todo => !todo.completed); // Check if there are any unchecked tasks
  const hasCheckedTasks = todos.some(todo => todo.completed); // Check if there are any checked tasks
  
  const markAllAsDone = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
    setAllCompleted(true);
  };
  
  const markAllAsUnfinished = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: false })));
    setAllCompleted(false);
  };

  const deleteAllTasks = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const handleDeleteConfirmed = () => {
    if (deleteAction === 'completed') {
      deleteCompletedTasks();
    } else if (deleteAction === 'all') {
      deleteAllTasks();
    }
    setDeleteAction(null); // Reset the action
  };
  

  return (
    <div className='TodoWrapper' style={{display: "flex",flexDirection: "column", border: "1px solid #5E1B89"}}>
      <div style={{ display: "flex", alignItems: "center", marginLeft:"10px", paddingBottom:"15px", justifyContent: "space-between"}}>
          <div className='d-flex  align-items-center'>
            <FontAwesomeIcon icon={faClipboard} className='todo-icon' />
            <h1 style={{ margin: 0 }}>ToDo List</h1>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-secondary dropdown-toggle custom-dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <FontAwesomeIcon icon={faEllipsis} />
            </button>
            {/* <!-- Button trigger modal -->
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
              </button> */}

            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item" onClick={markAllAsUnfinished} disabled={!hasCheckedTasks}>Mark All as Unfinished</button></li>
              <li><button className="dropdown-item" onClick={markAllAsDone} disabled={!hasUncheckedTasks}>Mark All as Done</button></li>
              <li><button className="dropdown-item" onClick={() => setDeleteAction('completed')} disabled={!hasCheckedTasks} data-bs-toggle="modal" data-bs-target="#exampleModal">Delete Completed Tasks</button></li>
              <li><button className="dropdown-item" onClick={() => setDeleteAction('all')} disabled={todos.length === 0} data-bs-toggle="modal" data-bs-target="#exampleModal">Delete All</button></li>
            </ul>
          </div>
          {/* start of modal */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Oops!</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete {deleteAction === 'all' ? 'all tasks' : 'the completed tasks'}?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteConfirmed}>Yes</button>
                </div>
              </div>
            </div>
          </div>
          {/* end of modal */}
      </div>
        <TodoForm addTodo={addTodo} />
        {/* {hasCompletedTasks && (
        <Button variant="primary" size='sm' onClick={deleteCompletedTasks} className='del-completed'>
          DELETE COMPLETED TASKS
        </Button>
        )} */}
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
