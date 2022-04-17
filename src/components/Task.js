import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralContext from '../context/general';

const Task = ({task}) => {
    const { deleteTask, editTask } = useContext(GeneralContext);
    const navigate = useNavigate();
    const goToPage = (url) => {
        navigate(url);
    }

    const changeStatus = () => {
        let newStatus = '';
        if(task.status === 'todo') {
            newStatus = 'progress';
        } else if(task.status === 'progress') {
            newStatus = 'done';
        } else {
            newStatus = 'todo';
        }
        editTask({...task, status: newStatus});
    }

    const getStatusClass = () => {
        if(task.status === 'todo') {
            return 'task-status';
        }else{
            return 'task-status--'+task.status;
        }
    }

    const viewTask = () => {
        goToPage('/task?id='+task.id);
    }

    const goToEditPage = () => {
        goToPage('/edit?id='+task.id);
    }

    return (
        <>
            <div className="task">
                <div className={getStatusClass()} onClick={changeStatus}></div>
                <div className="task-content">
                    <div className='task-title'>
                        {task.name}
                    </div>
                    <div className="task-button-row">
                        <button className='task-button' onClick={viewTask} >
                            View
                        </button>
                        <button className='task-button' onClick={goToEditPage} >
                            Edit
                        </button>
                        <button className='task-button--caution' onClick={x=>deleteTask(task.id)}>
                            X
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Task;