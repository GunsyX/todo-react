import React, { useState, useEffect, useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import str from '../misc/strings';
import handleValidate from '../misc/validator';
const { validate:v } = str;


const Register = () => {
    const navigate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const goToPage = (url) => {
        navigate(url);
    }

    const [mail, setMail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const submit = () => {
        if(validate()) {
            apply();
        }
    }

    const matchPassword = (pass) => {
        const result = {
            error: password !== pass? v.password2.matchPassword: null,
        };
        return result;
    }

    const validations = {
        mail: {
            required: true,
            email: true,
            errors: v.mail,
        },
        username: {
            required: true,
            minLength: 3,
            maxLength: 20,
            errors: v.username,
        },
        password: {
            required: true,
            minLength: 8,
            maxLength: 300,
            errors: v.password
        },
        password2: {
            required: true,
            errors: v.password2,
            customValidations: [
                matchPassword
            ]
        }
    }

    const validate = () => {
        const values = {
            mail,
            username,
            password,
            password2
        }
        const result = handleValidate(validations, values);
        setFormErrors(result);
        if(result.length>0){
            return false;
        } else {
            return true;
        }
    }

    const apply = () => {
        registerUser({mail, username, password});
        navigate('/');
    }
    
    const getErrorText = (fieldObject) => {
        const error = formErrors.find(e => (e.field === Object.keys(fieldObject)[0] && e.error))?.error;
        return error? <span className="text-danger">{error}</span> : null;
    }

    return (
        <div className='h-100 col d-flex flex-column justify-content-center align-items-center'>
            <div className="content-wrapper">
                <h1>Register.</h1>
                <div className='d-flex flex-column'>
                    <Form className='d-flex flex-column'>
                        <div className='row'>
                            <div className='col'>
                                <Form.Group className='mt-3' controlId="formBasicEmail">
                                    <Form.Label >Email address</Form.Label>
                                    <Form.Control type="email" onChange={x=>setMail(x.target.value)} placeholder="Enter email" />
                                    {/* <div class="invalid-feedback">
                                        Please choose a username.
                                    </div>         */}
                                    {getErrorText({mail})}
                                </Form.Group>
                            </div>
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
                            <div className='col'>
                                {/* confirm password */}
                                <Form.Group className="mt-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" onChange={x=>setPassword2(x.target.value)} placeholder="Confirm Password" />
                                    {getErrorText({password2})}
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                    <div className='d-flex flex-row mt-3'>
                        <Button style={{flex: 1}} onClick={submit}>Register</Button>
                        <Button style={{marginLeft: '1rem'}} onClick={()=>goToPage('/')}>Go back</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
 
export default Register;