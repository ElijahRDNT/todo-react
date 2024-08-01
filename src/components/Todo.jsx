import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
  console.log(task)

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Created at: {task.createdAt}
    </Tooltip>
  );

  const circleButtonStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    marginRight: '10px',
    background: "rgba(94, 27, 137, 0.5)",
    fontFamily: "'Times New Roman'"
  };

  return (
    <div className='Todo d-flex justify-content-between align-items-center'>
      <div className='Todo d-flex align-items-center' style={{padding: '0rem', marginBottom: "0px"}}>
      <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
      >
        <Button variant="success" style={circleButtonStyle}>i</Button>
      </OverlayTrigger>
      <p className={`${task.completed ? "completed" : ""}`} style={{marginLeft: '10px', marginTop:"10px"}}>{task.task}</p>
      </div>

      <div>
        <input onChange={() => toggleComplete(task.id)} className={`${task.completed ? "completed" : ""} form-check-input`} type="checkbox" checked={task.completed} value="" id="flexCheckDefault" style={{cursor:"pointer", alignItems:"center", marginRight:"12px", marginTop:"5px"}}/>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  )
}
