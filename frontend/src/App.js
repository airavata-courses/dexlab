import React from 'react';  
import './App.css';  
import Login from './Login';  
import Reg from './Reg';  
import Dashboard from './Dashboard';
import UserHistory from './UserHistory'
  
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';   

function App() {  
  return (  
    <Router>    
      <div className="container">    
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href='/login'>Home</a>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link" href="/login">Login</a>
              <a class="nav-item nav-link" href="/signup">Signup</a>
            </div>
          </div>
        </nav>   <br />
        <Routes>    
          <Route exact path='/login' element={<Login/>} />    
          <Route exact path='/signup' element={<Reg/>} />    
        </Routes>    
        <Routes>  
        <Route exact path='/Dashboard' element={<Dashboard/>} /> 
        <Route exact path='/UserHistory' element={<UserHistory/>} /> 
        </Routes>  
      </div>    
    </Router>   

  );  
}  

export default App;


