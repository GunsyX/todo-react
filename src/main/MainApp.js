import React from 'react';
import AppRouter from './AppRouter';
import StateHouse from './StateHouse';

const MainApp = () => {


    return (
        <>
            <StateHouse /*props to pass to statehouse*/ >
                <AppRouter />
            </StateHouse>
        </>
        // app router and stuff
    )
}

export default MainApp;