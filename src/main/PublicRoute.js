import React, { useState, useEffect, useContext } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import UserContext from '../context/user';

const PublicRoute = ({path, children, strictRoute}) => {

    const { user } = useContext(UserContext);

    return (
        <>
            {
                (
                    <Routes>
                        <Route path={path} element={ 
                            <>
                                
                                {
                                    !user.username || !strictRoute?
                                    children:
                                    <Navigate to="/todo" />
                                }
                            </>
                        } />
                    </Routes>
                )
            }
                
        </>
    )
}

export default PublicRoute;