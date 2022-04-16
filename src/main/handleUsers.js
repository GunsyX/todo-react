import React, { useState, useEffect, useRef } from 'react';
import str from '../misc/strings';
const { requestErrors: re } = str;
import { nanoid } from 'nanoid';

const useUserHandler = ({data, setData}) => {
    
    const getSession = () => {
        const session = data.session || {};
        console.log({session});
        return session;
    }

    const [user, setUser] = useState(getSession()); //session
    const registerUser = (userData) => {
        console.log('setData, registerUser 14 line');
        const newUser = {
            ...userData,
            id: nanoid(12)
        }
        setData(data => {
            const newData = {
                ...data,
                users: [...data.users, newUser],
                session: newUser
            }
            console.log({newData});
            console.log(data.users);
            console.log([...data.users, newUser]);
            return newData;
        });
        setUser(newUser);
    }

    useEffect(()=>{
        console.log('setData, handleUsers useEffect bind run 26 line')
        console.log({user});
        console.log('important, user changes')
        if(user.username){
            setData(data => {
                //filter out user
                //add in the new user data
                console.log({users});
                const users = data.users.filter(x => x.username !== user.username);
                users.push(user);
                console.log({users});
                const newData = {
                    ...data,
                    users
                }
                console.log({newData});
                return newData;
            });
        }
    }, [user]);

    const loginUser = (partialUserData) => {
        const user = data.users.find(x=>x.username === partialUserData.username);
        if(user){
            if(user.password === partialUserData.password){
                setUser(user);
                console.log('setData, login user 47 line')
                setData(data => {
                    const newData = {
                        ...data,
                        session: user
                    }
                    return newData;
                });
                return {error: null};
            }else{
                return {error: re.wrong_password};
            }
        } else {
            return {error: re.user_not_found};
        }
    }

    const logoutUser = () => {
        setUser({});
        console.log('setData, logoutUser 65 line');
        setData(data => {
            const newData = {
                ...data,
                session: {}
            }
            console.log('DATA CHANGE', newData);
            return newData;
        });
    }

    return ({user, registerUser, loginUser, logoutUser});
}
 
export default useUserHandler;