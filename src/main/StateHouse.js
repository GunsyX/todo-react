import React, { useEffect, useRef, useState } from 'react';
import GeneralContext from '../context/general';
import UserContext from '../context/user';
import str from '../misc/strings';
import useDataHandler from './handleMainData';
import useUserHandler from './handleUsers';
import useTaskHandler from './handleTasks';
const { requestErrors: re } = str;

const StateHouse = ({children}) => {
    const {data, setData} = useDataHandler();
    const {user, registerUser, loginUser, logoutUser} = useUserHandler({data, setData});
    const {tasks, setTasks, createTask, editTask, deleteTask} = useTaskHandler({data, setData, user});

    const userContextValue = {
        user, loginUser, registerUser, logoutUser
    }
    const generalContextValue = {
        tasks, setTasks, createTask, editTask, deleteTask
    };
    return (
        <>
            <UserContext.Provider value={userContextValue}>
                <GeneralContext.Provider value={generalContextValue}>
                    {children}
                </GeneralContext.Provider>
            </UserContext.Provider>
        </>
    )
}


export default StateHouse;