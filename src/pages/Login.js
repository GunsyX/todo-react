import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import str from '../misc/strings';
import handleValidate from '../misc/validator';
const { validate:v } = str;

const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useContext(UserContext);
    const goToPage = (url) => {
        navigate(url);
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const submit = () => {
        if(validate()) {
            login();
        }
    }
    
    const validations = {
        username: {
            required: true,
            errors: v.username,
        },
        password: {
            required: true,
            errors: v.password
        }
    }

    const validate = () => {
        const values = {
            username,
            password
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

    const login = () => {
        const res = loginUser({username, password});
        if(!res.error){
            navigate('/');
        } else {
            alert(res.error);
        }
    }

    const getErrorText = (fieldObject) => {
        const error = formErrors.find(e => (e.field === Object.keys(fieldObject)[0] && e.error))?.error;
        return error? <span className="text-danger">{error}</span> : null;
    }

    return (
        <div className='h-100 col d-flex flex-column justify-content-center align-items-center'>
            <div className='content-wrapper'>
                <h1>Time to get productive.</h1>
                <div className='d-flex flex-column'>
                    <Form className='d-flex flex-column'>
                        <div className='row'>
                            {/* username */}
                            <div className='col'>
                                <Form.Group className='mt-3' controlId="formBasicPassword">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" onChange={x=>setUsername(x.target.value)} placeholder="Username" />
                                    {getErrorText({username})}
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                {/* password */}
                                <Form.Group className='mt-3' controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={x=>setPassword(x.target.value)} placeholder="Password" />
                                    {getErrorText({password})}
                                </Form.Group>
                            </div>
                        </div>
                        
                    </Form>
                    <div className='d-flex flex-row mt-3'>
                        <Button style={{flex: 1}} onClick={submit}>Login</Button>
                        <Button style={{marginLeft: '1rem'}} onClick={()=>goToPage('/')}>Go back</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
 
export default Login;