import React from 'react';  
import './App.css';
import styled from "styled-components";
import { AccountBox } from "./accountBox";  
import Login from './Login';  
import Reg from './Reg';  
import LoginForm from './accountBox/loginForm';
import Dashboard from './Dashboard';
import UserHistory from './UserHistory'
// import {Route, Switch } from "react-router";
import earth from "./assets/gesdisc_marble.jpg";
  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';   


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url(${earth});
`;

function App() {  
  const myStyle={
        // backgroundImage: `url(${earth})`,
        backgroundSize: 'contain',
        height: "100vh",
    };
  return (  
    <Router>
      <div style={myStyle}>
    
     
      <AppContainer>
      <Switch>
        <Route path={'/'} >
          <AccountBox/>
        </Route>
        <Route path={'/signup'} >          
          <AccountBox/>
          </Route>        
        <Route  path={'/Dashboard'}>
          <Dashboard/>
        </Route> 
        <Route  path={'/UserHistory'}>
          <UserHistory/>
          </Route>         
      </Switch>
      </AppContainer>   
     </div>
    
    </Router> 
  );  
}  

export default App;


