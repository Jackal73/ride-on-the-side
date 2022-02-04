import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import BookingCar from './pages/BookingCar.js';



function App() {
    return (
        <div className="App">
        {/* <h1>RIDE ON THE SIDE</h1> */}
            <BrowserRouter>

                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/bookingcar' exact component={BookingCar} />

            </BrowserRouter>
        </div>
    );
}

export default App;
