import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container">  
        <Switch>
        <Route exact path ='/' component={Home}/>
          <Route exact path ='/home' component={Home}/>
          <Route exact path ='/viewProfile/:id' component = {Profile}/>          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
