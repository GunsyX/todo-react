import React from 'react';
import { Route, Routes} from 'react-router-dom';
import StartPage from '../pages/StartPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import TodoPage from '../pages/TodoPage';
import TaskPage from '../pages/TaskPage';

const PageRoutes = () => {

    return (
        <>
        
            <PrivateRoute path="/todo">
                <TodoPage />
            </PrivateRoute>

            <PrivateRoute path="/create">
                <TaskPage />
            </PrivateRoute>

            <PrivateRoute path="/task">
                <TaskPage />
            </PrivateRoute>

            <PrivateRoute path="/edit">
                <TaskPage />
            </PrivateRoute>
            
            <PublicRoute path="/">
                <StartPage />
            </PublicRoute>

            <PublicRoute path="/login" strictRoute={true}>
                <Login />
            </PublicRoute>

            <PublicRoute path="/register" strictRoute={true}>
                <Register />
            </PublicRoute>

        </>
    )
}

// Strict public routes are only accessible if the user is not logged in, where as normal puhlic routes are accessible to all users, logged in or not.

export default PageRoutes;