import React from 'react';
import AppRouter from './AppRouter';
import StateHouse from './StateHouse';

const MainApp = () => {


    return (
        <>
            <StateHouse>
                <AppRouter />
            </StateHouse>
        </>
    )
}

export default MainApp;