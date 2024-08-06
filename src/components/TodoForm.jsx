import React, { useState } from 'react'
import './TodoForm.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export const TodoForm = ({addTodo}) => {
  const [value, setValue] = useState("")
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() && selectedDate && selectedTime) {
      addTodo(value, selectedDate, selectedTime);
      setValue('');
      setSelectedDate('');
      setSelectedTime('');
      console.log(`Selected date: ${selectedDate}`);
      console.log(`Selected time: ${selectedTime}`);
    }
  }

  return (
    <form className='TodoForm d-flex align-items-center justify-content-space-around form-container' onSubmit={handleSubmit}>
        <div className="form-floating mb-3 me-3" >
            <input type="text" className="form-control" id="floatingInput" placeholder="Add Task Here" value={value} onChange={(e) => setValue(e.target.value)}/>
            <label className='input-placeholder' htmlFor="floatingInput">Input Task Here</label>
        </div>

        <div className="form-floating mb-3 me-3">
            <input type="date" className="form-control" id="floatingInput" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{color: "rgba(94, 27, 137, 0.8)"}} required/>
        </div>
        <div className="form-floating mb-3 me-3">
            <input type="time" className="form-control" id="floatingInput" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} style={{color: "rgba(94, 27, 137, 0.8)"}}  required/>
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3 todo-btn add">+</button>
        </div>
    </form>
  )
}
