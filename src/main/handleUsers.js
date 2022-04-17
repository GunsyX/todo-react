import React, { useState, useEffect, useRef } from 'react';
import str from '../misc/strings';
const { requestErrors: re } = str;
import { nanoid } from 'nanoid';

const useUserHandler = ({data, setData}) => {
    
    const getSession = () => {
        const session = data.session || {};
        return session;
    }
    const [user, setUser] = useState(getSession()); // logged in session is stored in `user` state

    const registerUser = (userData) => {
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
            return newData;
        });
        setUser(newUser);
    }

    const loginUser = (partialUserData) => {
        const user = data.users.find(x=>x.username === partialUserData.username);
        if(user){
            if(user.password === partialUserData.password){
                setUser(user);
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
        // clear session
        setUser({});
        setData(data => {
            const newData = {
                ...data,
                session: {}
            }
            return newData;
        });
    }

    useEffect(()=>{
        // whenever user changes, update it in main data state too, but this function is not needed yet as of now.
        if(user.username){
            setData(data => {
                //filter out user
                //add in the new user data
                const users = data.users.filter(x => x.username !== user.username);
                users.push(user);
                const newData = {
                    ...data,
                    users
                }
                return newData;
            });
        }
    }, [user]);

    return ({user, registerUser, loginUser, logoutUser});
}
 
export default useUserHandler;