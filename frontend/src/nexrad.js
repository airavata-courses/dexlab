import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Button, List } from 'reactstrap';
import { withRouter } from "react-router-dom";
import styled from "styled-components";
// import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const CalendarContainer = styled.div`
  opacity: 0.7;
`;
const DropContainer = styled.div`
  opacity: 0.8
`;

const Nexrad  = (props) => {
        let options = [];
        let defaultOption = options[0];
        const [date, setDate] = useState(new Date());    
        const [opt,setOpt] = useState(options); 
        const [val, setVal] = useState(opt[0]);
        const [img, setImage] = useState();
        const [userID,setUserID] = useState();
        const radarURL = "http://localhost:3001/radar/get";
        const imageURL = "http://localhost:3001/radar/plot";
        const activityUrl = "http://localhost:3001/activity/set"
        const getImage = () =>{       
            let data = {
                "date": date.toISOString().split('T')[0],
                "radar": val
                }
            fetch(imageURL,{
                method: 'POST',
                headers : {
                'Content-Type': 'application/json',
                'Accept': 'image/png'
                },
                body : JSON.stringify(data)})
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                    // console.log(window.location.href);
                    // let params = new URLSearchParams(document.location.search);

                    let name = props.location.state.userid;
                    let token = props.location.state.token;
                    console.log(name)
                    setUserID(name)
                    fetch(`${activityUrl}`,{
                        method: 'POST',
                        headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'image/png',
                        'uniqueid': name,
                        'token': token
                        },
                        body : JSON.stringify({
                            "date": new Date().toISOString().split('T')[0],
                            "location": val,
                            "time": new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
                            "type":'radar'
                        })
                    })
                    .then(resp => {
                        console.log(resp)
                    })
                    return resp.blob();
                } else {
                throw new Error(resp.statusText);
                }
            })
            .then(imageBlob => {
                const reader = new FileReader();
                reader.readAsDataURL(imageBlob);
                reader.onloadend = () => {
                let base64data = reader.result;
                setImage(base64data)}
            })
            .catch((error) => console.log(error));
        };
        const getOptions = () => {
        fetch(radarURL,{
                method: 'GET',
                headers : {
                'Content-Type': 'application/json',
                'date' : new Date().toISOString().slice(0, 10)
                }})
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                return resp.json();
                } else {
                throw new Error(resp.statusText);
                }
            })
            .then(data => {
                options = data.radars
                setOpt(options)
                setVal(options[0])
                console.log(options)
            })
            .catch((error) => console.log(error));
        };
        const dropDown = (e) =>{
            setVal(e.value)        
        }
        const settingDate = (e) =>{
            setDate(e)
            getOptions()
        }

        const h3Style = {
        marginLeft:80,
        color:'#E5E5E5',
         fontSize: 40,     
        }
        useEffect(() => {
            getOptions();
        },[]);
        return (
            <> 
            <div class="container">
                <div class="row ">
                    <div class="col-md-6 align-top-center">

                            <h3 style = {h3Style}>Select Date</h3>

                    </div>
                    <div class="col-md-6 align-top-center">

                        <h3 style = {{marginLeft : 220, color:'#E5E5E5',fontSize: 40}} >Select Radar</h3>
                    </div>
                </div>
            
                <div class="row ">
                    <div class="col-sm align-top-center">
                        <div class="row">
                            <h1></h1>
                        </div>
                        <div class="row">
                        <CalendarContainer>
                        <Calendar onChange={settingDate} value={date} />
                        
                        </CalendarContainer>
                        </div>
                    </div>
                    <div class="col-sm align-top-center">
                        <div class="row">
                            <h1></h1>
                        </div>
                        <div class="row">
                            <h1></h1>
                        </div>
                        <div class="row">
                            <DropContainer>
                             <Dropdown options={opt} onChange={dropDown} value={val} placeholder="Select an option" />
                             </DropContainer>
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
                    {img ? <img src={img} /> : null}
                </div>
            </>
            
        );
        
}


export default withRouter(Nexrad);
