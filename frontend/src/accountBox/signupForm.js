import React, { Component , useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { Redirect } from "react-router-dom";
import { AccountContext } from "./accountContext";
import { withRouter } from "react-router-dom";
class SignupForm extends Component {
  static contextType = AccountContext;
  constructor(props) {
    super(props);
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
      console.log(window.location.assign("http://localhost:3001/signup"))
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
      console.log(value)
      if (value.message == 'Success'){
        // console.log(this.props)
          this.props.history.push("/tabs", { ...value });

          // alert("Account created please Login")
            // console.log(window.location.assign("http://localhost:3000/tabs"));
            // console.log(window.location.assign(`http://localhost:3000/`))
          }
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


  
  render(){
    const { switchToSignin } = this.context;
  return (
    <BoxContainer>
      <FormContainer>
        <form>
        <Input type="text"  onChange={this.Name} placeholder="Name" required/>
        <Input type="email"  onChange={this.Email} placeholder="Email" required/>
        <Input type="password"  onChange={this.Password} placeholder="Password" required />
        <Input type="password"  onChange={this.Confirm_Password} placeholder="Confirm Password" required />
        </form>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={this.register} >Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink >
        Already have an account?
        <BoldLink onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
}
export default withRouter(SignupForm);