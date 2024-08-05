import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';


export const Todo = ({task, toggleComplete, deleteTodo, editTodo, deadlineDate, deadlineTime}) => {
  console.log(task)
  const [modalShow, setModalShow] = useState(false);

  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props} style={{...props.style, opacity: '85%'}}>
  //     {task.createdAt}
  //   </Tooltip>
  // );

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className='modal-head'>
          <Modal.Title id="contained-modal-title-vcenter" className='details-head'>
            Task Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{task.task}</h4>
          <p>
            Created: {task.createdAt} <br />
            Due Date: {task.deadlineDate} <br />
            Due Time: {task.deadlineTime}
          </p>
        </Modal.Body>
      </Modal>
    );
  }



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
    fontSize: "12px",
    border: "solid 1px #F8FFFE"
  };

  return (
    <div className='Todo d-flex justify-content-between align-items-center tasks'>
      <div className='Todo d-flex align-items-center' style={{padding: '0rem', marginBottom: "0px"}}>
      {/* <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 300 }}
      overlay={renderTooltip}
      > */}
        <Button variant="primary" style={circleButtonStyle} onClick={() => setModalShow(true)}>i</Button>

        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        />
      {/* </OverlayTrigger> */}
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
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{backgroundColor: "#5E1B89", border: "solid 1px #FF7F4D"}}>Cancel</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => deleteTodo(task.id)} style={{backgroundColor: "#FF7F4D", border: "solid 1px #5E1B89"}}>Yes</button>
                </div>
              </div>
            </div>
          </div>
          {/* end of modal */}
    </div>
  )
}
