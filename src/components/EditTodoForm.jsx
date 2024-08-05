import React, { useState } from 'react'
import './TodoForm.css'

export const EditTodoForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.task)
  const [selectedDate, setSelectedDate] = useState(task.deadlineDate || "");
  const [selectedTime, setSelectedTime] = useState(task.deadlineTime || "");

  const handleSubmit = e => {
    e.preventDefault();

    editTodo(value, task.id, selectedDate, selectedTime);

    setValue("");
  }

  return (
    <form className='TodoForm d-flex align-items-center justify-content-space-around' onSubmit={handleSubmit}>
        <div className="form-floating mb-3 me-3" >
            <input type="text" className="form-control" id="floatingInput" value={value} onChange={(e) => setValue(e.target.value)}/>
            <label className="input-placeholder" htmlFor="floatingInput">Update Task</label>
        </div>

        <div className="form-floating mb-3 me-3">
            <input type="date" className="form-control" id="floatingInput" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required/>
        </div>
        <div className="form-floating mb-3 me-3">
            <input type="time" className="form-control" id="floatingInput" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required/>
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3 todo-btn edit">Edit</button>
        </div>
    </form>
  )
}
