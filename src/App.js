import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import "./App.css";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import BookingCar from "./pages/BookingCar.js";
import AdminHome from "./pages/AdminHome.js";
import Home from "./pages/Home.js";

import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import UserBookings from "./pages/UserBookings";
import EditProfile from "./pages/EditProfile";


function App() {
  return (
    <div className="App">
      {/* <h1>RIDE ON THE SIDE</h1> */}
      <BrowserRouter>
        <ProtectedRoute path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <ProtectedRoute path="/booking/:carid" exact component={BookingCar} />
        <ProtectedRoute path="/userbookings" exact component={UserBookings} />
        <ProtectedRoute path="/addcar" exact component={AddCar} />
        <ProtectedRoute path="/editcar/:carid" exact component={EditCar} />
        <ProtectedRoute path="/admin" exact component={AdminHome} />
        <ProtectedRoute path="/editprofile" exact component={EditProfile} />
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
