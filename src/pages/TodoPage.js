import React, { useState, useEffect, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Task from '../components/Task';
import GeneralContext from '../context/general';
import UserContext from '../context/user';

const TodoPage = () => {
    const navigate = useNavigate();
    const { logoutUser, user } = useContext(UserContext);
    const { tasks, deleteTask } = useContext(GeneralContext);
    const getUserTasks = (tasks) => {
        console.log({user});
        console.log(user.id);
        console.log(tasks.filter(task => task.userID === user.id));
        console.log({userTasks: tasks.filter(task => task.userID === user.id)})
        return tasks.filter(task => task.userID === user.id);
    }
    const [ userTasks, setUserTasks ] = useState(getUserTasks(tasks));
    useEffect(()=>{
        setUserTasks(getUserTasks(tasks));
    }, [tasks]);
    const goToPage = (url) => {
        navigate(url);
    }

    const createTask = () => {
        navigate('/create');
    }

    return (
        <div className='h-100 col d-flex flex-column justify-content-center align-items-center'>
            <div className='d-flex flex-column align-items-left content-wrapper'>
                <h1>The Todo app</h1>
                <h3 style={{marginBottom: '2rem'}}>Create tasks, mark them done, go nuts.</h3>
                <div className='d-flex flex-row'>
                    <div className="tasks-container">
                        {
                            userTasks?.map(task => (
                                <Task key={task.id} task={task} />
                            ))
                        }
                    </div>
                </div>
                <div className="d-flex tp-button-row">
                    <Button onClick={createTask} style={{flex:1}} >Create New Task</Button>
                    <Button onClick={logoutUser} >Logout</Button>
                </div>
            </div>


        </div>
    );
}
 
export default TodoPage;