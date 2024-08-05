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
    <Tooltip id="button-tooltip" {...props} style={{...props.style, opacity: '85%'}}>
      {task.createdAt}
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
    fontFamily: "'Roboto Slab'",
    fontSize: "12px"
  };

  return (
    <div className='Todo d-flex justify-content-between align-items-center tasks'>
      <div className='Todo d-flex align-items-center' style={{padding: '0rem', marginBottom: "0px"}}>
      <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 300 }}
      overlay={renderTooltip}
      >
        <Button variant="success" style={circleButtonStyle}>i</Button>
      </OverlayTrigger>
      <p className={`${task.completed ? "completed" : ""}`} >{task.task}</p>
      </div>

      <div>
        <input onChange={() => toggleComplete(task.id)} className={`${task.completed ? "completed" : ""} form-check-input`} type="checkbox" checked={task.completed} value="" id="flexCheckDefault" style={{cursor:"pointer", alignItems:"center", marginRight:"12px", marginTop:"5px"}}/>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} type='button' data-bs-toggle="modal" data-bs-target="#deleteSingleModal" />
      </div>
      {/* start of modal */}
      <div className="modal fade" id="deleteSingleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Oops!</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this task?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteTodo(task.id)}>Yes</button>
                </div>
              </div>
            </div>
          </div>
          {/* end of modal */}
    </div>
  )
}
