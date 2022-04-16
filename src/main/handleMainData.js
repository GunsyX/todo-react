import React, { useState, useEffect, useRef } from 'react';
import str from '../misc/strings';
const { requestErrors: re } = str;

const emptyData = ({
    session: {},
    users: [],
    tasks: []
});

const useDataHandler = () => {
    const getData = () => {
        try {
            const data = JSON.parse(localStorage.getItem('data'));
            if(data){
                return data;
            }else{
                return emptyData;
            }
        } catch {
            console.log('error getting data from localStorage, proceeding with empty data');
            return emptyData;
        }
    }

    const [data, setData] = useState(getData());

    const firstRunCheck = useRef(true);
    useEffect(()=>{
        //unless first run
        console.log('data run');
        if(!firstRunCheck.current){
            localStorage.setItem('data', JSON.stringify(data));
        }else{
            firstRunCheck.current = false;
        }
        
        console.log('use effect data');
        console.log(data);

    }, [data]);

    return ({data, setData});
}
 
export default useDataHandler;