import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Articles from './pages/Articles';
import Orders from './pages/Orders';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="articles" element={<Articles />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
