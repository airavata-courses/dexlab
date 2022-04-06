import React, { useState, useEffect } from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import 'react-dropdown/style.css';

import { Button, List } from 'reactstrap';
const UserHistory  = () => {
    const actionsUrl = "http://localhost:3001/activity/get";

    const [action, setaction] = useState();
    const [table,setTable] = useState();
    const dataDisplay =() =>{
        let length = 0;
        setTable(action.map(
            (info)=>{
               
                return(<tr key={info.id} >
                        <td style={{color:'white'}}>{info.date}</td>
                        <td style={{color:'white'}}>{info.time}</td>
                        <td style={{color:'white'}}>{info.location}</td>
                    </tr>)

            }
        ))
    }

    const getHistory = () =>{
        let params = new URLSearchParams(document.location.search);
        let name = params.get("userid");
        fetch(actionsUrl,{
                method: 'GET',
                headers : {
                'Content-Type': 'application/json',
                'uniqueid' : name
                }})
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                
                return resp.json();
                } else {
                throw new Error(resp.statusText);
                }
            })
            .then(values => {
                console.log(values);
                setaction(values.userLogs.data)
                console.log('****************')
                console.log(action)
                dataDisplay();
            })
            .catch((error) => console.log(error));  
        };   
    useEffect(() => {
            getHistory();
        },[getHistory()]);
    return (
        <>
            <div>
            {/* <Button variant= "success" className='btn' onClick={() => { getHistory(); }}>Get</Button> */}

            <div>
            <table class="table table-striped" style={{color:'white'}}>
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Radar</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
             
        </div>
             {action ? <h2> </h2>: null}
        </div>
        </>
    )



}


export default UserHistory;