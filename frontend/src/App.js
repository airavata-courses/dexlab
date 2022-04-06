import React from 'react';  
import './App.css';
import styled from "styled-components";
import { AccountBox } from "./accountBox";  
import LaunchTabs  from "./tabsPage"
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
    <div style={myStyle}>   
    <Router>
      
      <AppContainer>
      <Switch>
        <Route exact path="/" >
          <AccountBox/>
        </Route>
        <Route path="/signup" >          
          <AccountBox/>
          </Route>  
        <Route  path="/tabs">
          <LaunchTabs/>
        </Route>      
        <Route  path="/dashboard">
          <Dashboard/>
        </Route> 
        <Route  path="/userhistory">
          <UserHistory/>
        </Route>         
      </Switch>
      </AppContainer> 
    </Router> 
    </div>
  );  
}  

export default App;


