import React, { useState, useEffect, useContext } from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import UserContext from '../context/user';

const PrivateRoute = ({path, children}) => {

    const { user } = useContext(UserContext);

    return (
        <>
            {
                (
                    <Routes>
                        <Route path={path} element={
                            <>
                                
                                {
                                    user.username?
                                    children:
                                    <Navigate to="/login" />
                                }
                            </>
                        } />
                    </Routes>
                )
            }
                
        </>
    )
}

export default PrivateRoute;