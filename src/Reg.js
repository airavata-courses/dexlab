import React, { Component } from 'react';
import axios from "axios";
import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from "react-router-dom";


class Reg extends Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      Confirm_Password: ''
    }
    this.Email = this.Email.bind(this);
    this.Password = this.Password.bind(this);
    this.Name = this.Name.bind(this);
    this.Confirm_Password = this.Confirm_Password.bind(this);
    this.register = this.register.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = `newPath`;
    this.props.history.push(path);
  }
  Email(event) {
    this.setState({ Email: event.target.value })
  }

  Name(event) {
    this.setState({ Name: event.target.value })
  }

  Password(event) {
    this.setState({ Password: event.target.value })
  }

  Confirm_Password(event) {
    this.setState({ Confirm_Password: event.target.value })
  }

  register(event) {
    console.log(this.state.Password, this.state.Confirm_Password)
    if (this.state.Password != this.state.Confirm_Password){
      alert("Password doesn't match, re-enter password")
      console.log(window.location.assign("http://localhost:3000/signup"))
    }
    let data = {
        name: this.state.Name,
        password: this.state.Password,
        email: this.state.Email
      }
    console.log("In here", data)
    fetch('http://localhost:3001/user/signup', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.Name,
        password: this.state.Password,
        email: this.state.Email
      })

    }).then((response) => {
      return response.json();
    })
    .then(value => {console.log(value);
      if (value.message == 'Success'){
            console.log(window.location.assign(`http://localhost:3000/dashboard?userid=${value.userid}`))}
        else if(Response.Status == 400)
          alert('User already exist')
        else
          alert('Something went wrong')
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong')
      });
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <div class="row" className="mb-2 pageheading">
                      <div class="col-sm-12 btn btn-primary">
                        Sign Up
                        </div>
                    </div>
                    <InputGroup className="mb-3">
                      <Input type="text"  onChange={this.Name} placeholder="Enter Name" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="email"  onChange={this.Email} placeholder="Enter Email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input type="password"  onChange={this.Password} placeholder="Enter Password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input type="password"  onChange={this.Confirm_Password} placeholder="Confirm Password" />
                    </InputGroup>
                    <Button  onClick={this.register}  color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Reg;
