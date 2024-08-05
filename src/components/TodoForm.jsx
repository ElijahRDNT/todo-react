import React, { useState } from 'react'
import './TodoForm.css'

export const TodoForm = ({addTodo}) => {
  const [value, setValue] = useState("")

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value);
      setValue('');
    }
  }

  return (
    <form className='TodoForm d-flex align-items-center justify-content-space-around' onSubmit={handleSubmit}>
        <div className="form-floating mb-3 me-3" >
            <input type="text" className="form-control" id="floatingInput" placeholder="Add Task Here" value={value} onChange={(e) => setValue(e.target.value)}/>
            <label className='input-placeholder' htmlFor="floatingInput">Input Task Here</label>
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3 todo-btn add">+</button>
        </div>
    </form>
  )
}