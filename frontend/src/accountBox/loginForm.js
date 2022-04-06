import React, { useContext,Component } from "react";
import axios from 'axios'; 
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
    static contextType = AccountContext;
    constructor(props) {
        super(props);
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
        const apiUrl = "http://localhost:3001/user/login"; 
        const data = { email:this.state.Email, password: this.state.Password };    
            axios.post(apiUrl, data)    
            .then((result) => {    
                const user = result.data;  
                if (result.data.message == 'Success'){
                  // console.log(window.location.assign(`http://localhost:3000/tabs?userid=${result.data.userid}`))};
                    console.log(window.location.assign(`http://localhost:3001/tabs?userid=${result.data.userid}`))}
            })
            .catch(error => {
                alert('Invalid User');
                console.log(window.location.assign("http://localhost:3001/signup"))
                console.log(error);
            });
          

    };
  
render(){
    const { switchToSignup } = this.context;
  return (
    <BoxContainer>
      <FormContainer>
        <form>
        <Input type="email"  onChange={this.Email} placeholder="Email" required/>
        <Input type="password" onChange={this.Password} placeholder="Password" required/>
        </form>
      </FormContainer>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={this.login} >Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink >
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
}
export default withRouter(LoginForm);