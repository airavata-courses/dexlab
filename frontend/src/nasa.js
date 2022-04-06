import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Button, List } from 'reactstrap';
import { withRouter } from "react-router-dom";
// import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const NASA  = () => {
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
                    console.log(window.location.href);
                    let params = new URLSearchParams(document.location.search);
                    let name = params.get("userid");
                    console.log(name)
                    setUserID(name)
                    fetch(`${activityUrl}`,{
                        method: 'POST',
                        headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'image/png',
                        'uniqueid': name
                        },
                        body : JSON.stringify({
                            "date": new Date().toISOString().split('T')[0],
                            "location": val,
                            "time": new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
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

        const getHistory = () =>{
            let params = new URLSearchParams(document.location.search);
            let userid = params.get("userid");
            console.log(window.location.assign(`http://localhost:3001/UserHistory?userid=${userid}`))
        }

        useEffect(() => {
            getOptions();
        },[]);
        return (
            <>   
            <div className="mb-2">
                 <Button variant= "success" className='btn' onClick={() => { getHistory(); }}>Past History</Button>
            </div>
            <h3>Select Date</h3>
            <div>
                <Calendar onChange={settingDate} value={date} />
            </div>
            <div class="row" className="mb-2 pageheading">
                <div class="col-sm-12 btn btn-primary">
                </div>
            </div>
            <h3>Select Radar</h3>
            <Dropdown options={opt} onChange={dropDown} value={val} placeholder="Select an option" />
            <h1>Click to see reflectivity!</h1>
            <div className="mb-2">
                 <Button variant= "success" className='btn' onClick={() => { getImage(); }}>See Refectivity</Button>
            </div>
                 {img ? <img src={img} /> : null}
            </>
            
        );
        
}


export default withRouter(NASA);
