import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Button, List } from 'reactstrap';
import { withRouter } from "react-router-dom";
import styled from "styled-components";
// import ReactHtmlParser from 'react-html-parser'; 
// import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const CalendarContainer = styled.div`
  opacity: 0.8
`;
const DropContainer = styled.div`
  opacity: 0.8
`;

const NASA  = (props) => {
        console.log("IN NSAS PROP")
        console.log(props.location.state)
        
        console.log()
        let years = [];
        let months = [];
        let radars = ['COCL', 'COEM', 'COLS', 'TO3']
        var max = new Date().getFullYear()
        var min = 1970
        for (var i = max; i >= min; i--) {
                years.push(i.toString())
            } 
        
        for (var i = 1; i <= 12; i++) {
                months.push(i.toString())
            }
        const [rad1, setRad1] = useState(radars[0]);
        const [val1, setVal1] = useState(new Date().getFullYear().toString());
        const [mon1, setMon1] = useState(new Date().getMonth().toString());
        const [img, setImage] = useState();
        let imag = img;
        const [userID,setUserID] = useState();
        
        let imageURL = "http://localhost:3001/radar/nasa";
        const activityUrl = "http://localhost:3001/activity/set"
        const getImage = () =>{   
            imageURL = `${imageURL}?year=${val1}&month=${mon1}&type=${rad1}`;
            console.log(imageURL)
  
            fetch(imageURL,{
                method: 'GET',
                headers : {
                'Content-Type': 'application/json',
                'Accept': 'image/png'
                }})
            .then(response => response.blob())
            .then(blob => {

                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                let base64data = reader.result;
                console.log(base64data)
                setImage(base64data)
                 fetch(`${activityUrl}`,{
                        method: 'POST',
                        headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'image/png',
                        'uniqueid': props.location.state.userid,
                        'token': props.location.state.token
                        },
                        body : JSON.stringify({
                            "year": val1,
                            "month": mon1,
                            "radar": rad1,
                            "type":'nasa'
                        })
                    }).then(resp => {
                        console.log(resp)
                    })
                
            }
        })
            .catch((error) => console.log(error));
        };
        
        const dropDownY = (e) =>{
            setVal1(e.value)   
        }
        const dropDownM = (e) =>{
            setMon1(e.value)  
         
        }
        const dropDownR = (e) =>{
            setRad1(e.value)     
        }
        const h3Style = {
        marginLeft:80,
        color:'#E5E5E5',
        fontSize: 40,     
        }
        useEffect(() => 
            // populateYears()
        []);
        return (
            <> 
            <div class="container">
                <div class="row ">
                    <div class="col-md">
                            <h3 style = {h3Style}>Select Year</h3>
                    </div>
                    <div class="col-md">
                        <h3 style = {{marginLeft : 100, color:'#E5E5E5',fontSize: 40}} >Select Month</h3>
                    </div>
                     <div class="col-md">

                        <h3 style = {{marginLeft : 100, color:'#E5E5E5',fontSize: 40}} >Select Radar</h3>
                    </div>
                </div>
            
                <div class="row ">
                    <div class="col-sm">
                        <div class="row">
                            <h1></h1>
                        </div>
                        <div class="row">
                             <div class="col-sm">
                         <DropContainer>
                             <Dropdown options={years} onChange={dropDownY} value={val1} placeholder="Select an option" />
                             </DropContainer>
                            </div>
                            <div class="col-sm">
                         <DropContainer>
                             <Dropdown options={months} onChange={dropDownM} value={mon1} placeholder="Select an option" />
                             </DropContainer>
                            </div>
                            <div class="col-sm">
                         <DropContainer>
                             <Dropdown options={radars} onChange={dropDownR} value={rad1} placeholder="Select an option" />
                             </DropContainer>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
       
            


                <br/>
                <h1 style = {{color:'#E5E5E5',fontSize: 40}}>Click to see reflectivity!</h1>
                <br/>
               <div >
                    <div >
                        <Button variant= "success" className='btn' onClick={() => { getImage(); }}>See Refectivity</Button>
                    </div>
                    {imag ? <img src={imag} /> : null}
                </div>
            </>
            
        );
        
}


export default withRouter(NASA);
