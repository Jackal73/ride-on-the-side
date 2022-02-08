import 'antd/dist/antd.css';
import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import BookingCar from './pages/BookingCar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';



function App() {
    return (
        <div className="App">
        {/* <h1>RIDE ON THE SIDE</h1> */}
            <BrowserRouter>

                <ProtectedRoute path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <protectedRoute path='/bookingcar' exact component={BookingCar} />

            </BrowserRouter>
        </div>
    );
}

export default App;

export function ProtectedRoute(props)
{


    if(localStorage.getItem('user'))
    {
        return <Route {...props} />;
    }
    else {
        return <Redirect to='/login' />
    }
}
