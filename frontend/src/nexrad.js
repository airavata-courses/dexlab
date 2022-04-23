import React, { useState, useEffect } from "react";
import "./App.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Button, List } from "reactstrap";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
// import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const CalendarContainer = styled.div`
  opacity: 0.7;
`;
const DropContainer = styled.div`
  opacity: 0.8;
`;

const Nexrad = (props) => {
  let options = [];
  let defaultOption = options[0];
  const [date, setDate] = useState(new Date());
  const [opt, setOpt] = useState(options);
  const [val, setVal] = useState(opt[0]);
  const [img, setImage] = useState();
  const [userID, setUserID] = useState();
  let radarURL = "http://localhost:3001/radar/get/";
  const imageURL = "http://localhost:3001/radar/plot";
  const activityUrl = "http://localhost:3001/activity/set";
  const getImage = () => {
    console.log("get");
    let data = {
      date: date.toISOString().split("T")[0],
      radar: val,
    };
    fetch(imageURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "image/png",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          let name = props.location.state.userid;
          let token = props.location.state.token;
          console.log(name);
          setUserID(name);
          fetch(`${activityUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "image/png",
              uniqueid: name,
              token: token,
            },
            body: JSON.stringify({
              date: new Date().toISOString().split("T")[0],
              location: val,
              time:
                new Date().getHours() +
                ":" +
                new Date().getMinutes() +
                ":" +
                new Date().getSeconds(),
              type: "radar",
            }),
          }).then((resp) => {
            console.log(resp);
          });
          return resp.blob();
        } else {
          throw new Error(resp.statusText);
        }
      })
      .then((imageBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
          let base64data = reader.result;
          setImage(base64data);
        };
      })
      .catch((error) => console.log(error));
  };
  const getOptions = () => {
    console.log(
      "Resetting options after date has been selected fro date:",
      date.toISOString().slice(0, 10)
    );
    radarURL = `${radarURL}?date=${date.toISOString().slice(0, 10)}`;
    fetch(radarURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        date: date.toISOString().slice(0, 10),
      },
    })
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          return resp.json();
        } else {
          throw new Error(resp.statusText);
        }
      })
      .then((data) => {
        console.log("data", data);
        options = data.radars;
        console.log("these are the options", options);
        setOpt(options);
        setVal(options[0]);
      })
      .catch((error) => console.log(error));
  };
  const dropDown = (e) => {
    setVal(e.value);
  };
  const settingDate = (e) => {
    console.log("selceted date", e);
    setDate(e);
  };

  const h3Style = {
    marginLeft: 80,
    color: "#E5E5E5",
    fontSize: 40,
  };
  useEffect(() => {
    console.log("nexrad use effect");
    getOptions();
  }, [date]);
  return (
    <>
      <div class="container">
        <div class="row ">
          <div class="col-md-6 align-top-center">
            <h3 style={h3Style}>Select Date</h3>
          </div>
          <div class="col-md-6 align-top-center">
            <h3 style={{ marginLeft: 220, color: "#E5E5E5", fontSize: 40 }}>
              Select Radar
            </h3>
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
                <Dropdown
                  options={opt}
                  onChange={dropDown}
                  value={val}
                  placeholder="Select an option"
                />
              </DropContainer>
            </div>
          </div>
        </div>
      </div>

      <br />
      <h1
        class="d-block text-center"
        style={{ color: "#E5E5E5", fontSize: 40 }}
      >
        Click to see reflectivity!
      </h1>
      <br />
      <div>
        <div class="d-block text-center">
          <Button
            variant="success"
            className="btn"
            onClick={() => {
              getImage();
            }}
          >
            See Refectivity
          </Button>
        </div>
        <br />
        {img ? (
          <img
            class="d-block mx-auto"
            style={{ height: "100%", width: "90%" }}
            src={img}
          />
        ) : null}
      </div>
    </>
  );
};

export default withRouter(Nexrad);
