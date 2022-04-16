import React, { useState, useEffect, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user';

const StartPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const goToPage = (url) => {
        navigate(url);
    }

    return (
        <div className='h-100 col d-flex flex-column justify-content-center align-items-center'>
            <div className="content-wrapper">
                {
                    user.username ?
                    <h1>Welcome back, {user.username}!</h1> :
                    <h1>The minimalistic todo.</h1>
                }
                <p style={{fontFamily: 'inter'}}>Simple yet fully private AES-256 encrypted secure todo system (not really).</p>
                <div className='d-flex flex-row'>
                    {
                        user.username?
                        <Button onClick={() => goToPage('/todo')} >Continue to TODO</Button> :
                        <>
                            <Button onClick={x=>goToPage('/login')} >Login</Button>
                            <Button onClick={x=>goToPage('/register')} style={{marginLeft: '1rem'}} >Register</Button>
                        </>
                        
                    }
                </div>
            </div>

        </div>
    );
}
 
export default StartPage;