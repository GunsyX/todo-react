import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import str from '../misc/strings';
const { requestErrors: re } = str;

const useTaskHandler = ({data, setData, user}) => {
    const [tasks, setTasks] = useState(data.tasks || []);
    const createTask = (taskData) => {
        const newTask = {
            id: nanoid(12),
            name: taskData.name,
            desc: taskData.desc,
            userID: user.id,
            status: 'todo'
        }
        setTasks([...tasks, newTask]);
        return {error: null};
    }
    const editTask = (taskData) => {
        const newTasks = tasks.map(task => {
            if(task.id === taskData.id){
                return {...task, ...taskData};
            }else{
                return task;
            }
        });
        setTasks(newTasks);
        return {error: null};
    }
    const deleteTask = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
    }

    useEffect(()=>{
        console.log('setData, handleUsers useEffect bind run 26 line')
        // if(){
            setData(data => {
                //filter out user
                //add in the new user data
                // const users = data.users.filter(user => user.username !== user.username);
                // users.push(user);
                const newData = {
                    ...data,
                    tasks
                }
                console.log({newData});
                return newData;
            });
        // }
    }, [tasks]);

    return ({tasks, setTasks, createTask, editTask, deleteTask});
}
 
export default useTaskHandler;