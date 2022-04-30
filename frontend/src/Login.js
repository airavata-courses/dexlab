// import React, { useState, useEffect } from 'react'   
import axios from 'axios'; 
import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: ''
        }
        this.Password = this.Password.bind(this);
        this.Email = this.Email.bind(this);
        this.login = this.login.bind(this);
    }
    Email(event) {
        this.setState({ Email: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    login(event) {
        const apiUrl = "http://192.168.49.2:30001/user/login"; 
        const data = { email:this.state.Email, password: this.state.Password };    
            axios.post(apiUrl, data)    
            .then((result) => {    
                const user = result.data;  
                if (result.data.message == 'Success'){
                    console.log(window.location.assign(`http://192.168.49.2:30001/dashboard?userid=${result.data.userid}`))}
            })
            .catch(error => {
                alert('Invalid User');
                console.log(window.location.assign("http://192.168.49.2:30001/login"))
                console.log(error);
            });
          

    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div class="row" className="mb-2 pageheading">
                                                <div class="col-sm-12 btn btn-primary">
                                                    Login
                                                </div>
                                            </div>
                                            <InputGroup className="mb-3">
                                                <Input type="text" onChange={this.Email} placeholder="Enter Email" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <Input type="password" onChange={this.Password} placeholder="Enter Password" />
                                            </InputGroup>
                                            <Button onClick={this.login} color="success" block>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );

    }

}

export default Login;
