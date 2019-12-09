import React, { Component } from "react";
import '../App.css'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';


class LoginRegisterForm extends Component{
	constructor(){
		super()

		this.state= {
			first_name: '',
			last_name: '',
			age: '',
			place_of_residence: '',
			email: '',
			password: '',
			action: 'login'
		}
	}

	loginRegister = () => {
		if(this.state.action === 'login') {
			this.props.login({
				email: this.state.email,
				password: this.state.password
			})
		} else{
			this.props.register({
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				age: this.state.age,
				place_of_residence: this.state.place_of_residence,
				email: this.state.email,
				password: this.state.password
			})
		}
	}

	switchForm = () => {
		if(this.state.action === 'login'){
			this.setState({
				action: 'register'
			})
		} else{
			this.setState({
				action: 'login'
			})
		}
	}

	handleChange = (e) => {
    e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.loginRegister()
	}

	render() {
    return(
    	<div>

            <header>
	           Welcome to the Chris List
            </header>
			<Form onSubmit={this.handleSubmit}>
	    	 {
		        this.state.action === "register"
		        ?
				  <React.Fragment>
				      <FormGroup>
				        <Label for="first_name">First Name</Label>
				        <Input type="text" name="first_name" id="first_name" value={this.state.first_name}
			                onChange={this.handleChange}/>
				      </FormGroup>
				      <FormGroup>
				        <Label for="last_name">Last Name</Label>
				        <Input type="text" name="last_name" id="last_name" value={this.state.last_name}
			                onChange={this.handleChange}/>
				      </FormGroup>
				      <FormGroup>
				        <Label for="age">Age</Label>
				        <Input type="text" name="age" id="age" value={this.state.age}
			                onChange={this.handleChange}/>
				      </FormGroup>
				      <FormGroup>
				        <Label for="place_of_residence">Place of Residence</Label>
				        <Input type="text" name="place_of_residence" id="place_of_residence" value={this.state.place_of_residence} onChange={this.handleChange}/>
				      </FormGroup>
		       </React.Fragment>
		            :
		            null
	          }
		          <FormGroup>
				        <Label for="email">Email</Label>
				        <Input type="text" name="email" id="email" value={this.state.email}
			                onChange={this.handleChange}/>
				      </FormGroup>
				      <FormGroup>
				        <Label for="password">Password</Label>
				        <Input type="password" name="password" id="password" value={this.state.password}
			                onChange={this.handleChange} />
				      </FormGroup>
		      <Button type="Submit">{this.state.action === "register" ? "Register" : "Log in" }</Button>
		    </Form>
		    {
			  this.state.action === "register"
			  ?
			  <small >Already have an account? Log in <span onClick={this.switchForm}>here</span>.</small>
			  :
			  <small >Need an account? Sign up <span onClick={this.switchForm}>here</span>!</small>  
		    }
	    </div>
  );
     
  }
}
export default LoginRegisterForm

