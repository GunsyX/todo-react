import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PageRoutes from './PageRoutes';
import { Container } from 'react-bootstrap';

const AppRouter = () => {

    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={ //main route
                        <Container>
                            <PageRoutes />
                        </Container>
                    } />
                </Routes>
            </BrowserRouter>
    )
}

export default AppRouter;