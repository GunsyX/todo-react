import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import GeneralContext from '../context/general';
import str from '../misc/strings';
import handleValidate from '../misc/validator';
const { validate:v } = str;

const TaskPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { tasks, createTask, editTask, deleteTask } = useContext(GeneralContext);
    const pageContext = (() => {
        const path = location.pathname;
        if(path.startsWith('/create')){
            return 'create';
        }else if(path.startsWith('/edit')){
            return 'edit';
        }else{
            return 'view';
        }
    })();
    const goToPage = (url) => {
        navigate(url);
    }
    const searchParams = new URLSearchParams(location.search);

    const processTaskID = (id) => {
        console.log(id);
        console.log({tasks});
        const task = tasks.find(task => task.id === id);
        console.log({task});
        if(task.userID === user.id){
            return task;
        }else{
            alert('You are not authorized to edit this task');
            return;
        }
    }


    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const submit = () => {
        if(validate()) {
            switch (pageContext) {
                case 'create':
                    create();                    
                    break;
                case 'edit':
                    edit();
                    break;
                default:
                    break;
            }
        }
    }

    
    useEffect(()=>{
        const id = searchParams.get('id');
        if(id){
            const task = processTaskID(id);
            setName(task.name);
            setDesc(task.desc);
        }
    }, []);
    
    const validations = {
        name: {
            required: true,
            errors: v.name,
        },
        desc: {
            required: false,
            errors: v.desc
        }
    }

    const validate = () => {
        const values = {
            name,
            desc
        }
        const result = handleValidate(validations, values);
        console.log({result});
        setFormErrors(result);
        if(result.length>0){
            return false;
        } else {
            return true;
        }
    }

    const create = () => {
        const res = createTask({name, desc});
        if(!res.error){
            navigate('/todo');
        } else {
            alert(res.error);
        }
    }

    const edit = () => {
        const id = searchParams.get('id');
        const res = editTask({id, name, desc});
        if(!res.error){
            navigate('/todo');
        } else {
            alert(res.error);
        }
    }

    const getErrorText = (fieldObject) => {
        const error = formErrors.find(e => (e.field === Object.keys(fieldObject)[0] && e.error))?.error;
        return error? <span className="text-danger">{error}</span> : null;
    }

    const getNameLabel = () => {
        if(pageContext === 'view'){
            return 'Name';
        } else {
            return "Name of the task";
        }
    }

    const getDescLabel = () => {
        if(pageContext === 'view'){
            return 'Description';
        } else {
            return "Add some details";
        }
    }

    useEffect(()=>{
        console.log(name)
    }, [name]);

    return (
        <div className='h-100 col d-flex flex-column justify-content-center align-items-center'>
            <div className='content-wrapper'>
                <h2>{pageContext==='create'?"Create a task.":pageContext==='edit'?'Edit task':'View Task'}</h2>
                <div className='d-flex flex-column'>
                    <div className='d-flex flex-column'>
                        <div className='row'>
                            {/* name */}
                            <div className='col'>
                                <Form.Group className='mt-3' controlId="formBasicPassword">
                                    <Form.Label>{getNameLabel()}</Form.Label>
                                    <Form.Control autoComplete='new-password' type="text" value={name} onChange={x=>setName(x.target.value)} placeholder="Name" />
                                    {getErrorText({name})}
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {/* desc */}
                                <Form.Group className='mt-3' controlId="formBasicPassword">
                                    <Form.Label>{getDescLabel()}</Form.Label>
                                    <Form.Control autoComplete='new-password' type="text" value={desc} onChange={x=>setDesc(x.target.value)} placeholder="Description" />
                                    {getErrorText({desc})}
                                </Form.Group>
                            </div>
                        </div>
                        
                    </div>
                    <div className='d-flex flex-row mt-3'>
                        {
                            pageContext === 'view' ?
                            <Button onClick={x=>goToPage('/todo')}>Go back</Button>:
                            pageContext === 'create' ?
                            <>
                                <Button onClick={submit} style={{flex: 1}}>Create</Button>
                                <Button onClick={x=>goToPage('/todo')} style={{marginLeft: '1rem'}} >Go back</Button>
                            </>:
                            <>
                                <Button type='button' onClick={submit} style={{flex: 1}}>Save</Button>
                                <Button onClick={x=>goToPage('/todo')} style={{marginLeft: '1rem'}} >Go back</Button>
                            </>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}
 
export default TaskPage;