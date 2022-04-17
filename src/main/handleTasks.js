import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import str from '../misc/strings';

const useTaskHandler = ({data, setData, user}) => {
    const [tasks, setTasks] = useState(data.tasks || []);
    const createTask = (taskData) => {
        const newTask = {
            id: nanoid(12),
            name: taskData.name,
            desc: taskData.desc,
            userID: user.id,
            status: 'todo' //todo, progress, done
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
        // whenever tasks change, update main data state.  
        setData(data => {
            const newData = {
                ...data,
                tasks
            }
            console.log({newData});
            return newData;
        });
    }, [tasks]);

    return ({tasks, setTasks, createTask, editTask, deleteTask});
}
 
export default useTaskHandler;