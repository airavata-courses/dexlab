import React, { useState, useEffect,useLayoutEffect } from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import 'react-dropdown/style.css';
import { withRouter } from "react-router-dom";
import { Button, List } from 'reactstrap';
const UserHistory  = (props) => {
    const actionsUrl = "http://localhost:3001/activity/get";
    console.log(props.location.state)
    // const [action, setaction] = useState();
    //   const [action2, setaction2] = useState();
    let action = null;
    let action2 = null;
  
    const [table,setTable] = useState();
    const [table2,setTable2] = useState();
    const setAction = (actions) =>{
        action = actions;
    }
    const setAction2 = (actions) =>{
        action2 = actions;
    }
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
        const dataDisplay2 =() =>{
        let length = 0;
        setTable2(action2.map(
            (info)=>{
                return(<tr key={info.id} >
                        <td style={{color:'white'}}>{info.year}</td>
                        <td style={{color:'white'}}>{info.month}</td>
                        <td style={{color:'white'}}>{info.radar}</td>
                    </tr>)
            }
        ))
    }

    const getHistory = () =>{
        fetch(actionsUrl,{
                method: 'GET',
                headers : {
                'Content-Type': 'application/json',
                'uniqueid' : props.location.state.userid,
                'token': props.location.state.token,
                }})
            .then((resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                
                return resp.json();
                } else {
                throw new Error(resp.statusText);
                }
            })
            .then(values => {
                console.log(values.userLogs);
                setAction(values.userLogs.radar);
                setAction2(values.userLogs.nasa)
                // console.log('****************')
                // console.log(action)
                dataDisplay();
                dataDisplay2();
                
            })
            .catch((error) => console.log(error));  
        };   
    // ;
    useLayoutEffect(() => {
       getHistory();
    }, []);
    return (
        <>
            <div>
            {/* <Button variant= "success" className='btn' onClick={() => { getHistory(); }}>Get</Button> */}
            {table ?
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
        :null}
        {console.log(action2)}
        {table2 ?
         <div>
             <br/>
             <h2 style={{color:'white'}}>NASA DATA HISTORY</h2>
            <table class="table table-striped" style={{color:'white'}}>
                <thead>
                    <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Radar</th>
                    </tr>
                </thead>
                <tbody>
                    {table2}
                </tbody>
            </table>
             
        </div>
        :null}
        { table && table2 ? <h2></h2> : <h2 style={{color:'white'}}>No History Found</h2> }
        
        </div>
        </>
    )



}


export default withRouter(UserHistory);