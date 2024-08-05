import React, { useState } from 'react'
import './TodoForm.css'

export const EditTodoForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.task)

  const handleSubmit = e => {
    e.preventDefault();

    editTodo(value, task.id);

    setValue("");
  }

  return (
    <form className='TodoForm d-flex align-items-center justify-content-space-around' onSubmit={handleSubmit}>
        <div className="form-floating mb-3 me-3" >
            <input type="text" className="form-control" id="floatingInput" value={value} onChange={(e) => setValue(e.target.value)}/>
            <label className="input-placeholder" htmlFor="floatingInput">Update Task</label>
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3 todo-btn edit">Edit</button>
        </div>
    </form>
  )
}
