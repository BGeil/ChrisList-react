import React from 'react';
import './App.css';
import ChrisListsContainer from './ChrisListsContainer';
import LoginRegisterForm from './LoginRegisterForm';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      loggedIn: false,
      loggedInUser: null
    }
  }


  login = async(loginInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const parsedLoginResponse = await response.json()
    if(parsedLoginResponse.status.code === 200) {
      this.setState({
        loggedIn: true,
        loggedInUser: parsedLoginResponse.data
      })
    } else{
      console.log('Login Failed')
      console.log(parsedLoginResponse);
    }
  }

  register = async (registerInfo) => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/users/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    const parsedRegisterResponse = await response.json()
    if(parsedRegisterResponse.status.code === 201){
      this.setState({
        loggedIn: true,
        loggedInUser: parsedRegisterResponse.data
      })
    } else {
      console.log('Register Failed')
      console.log(parsedRegisterResponse)
    }
  }

  logout = async(loginInfo) => {
    this.setState({
      loggedIn: false
    })
  }

  render(){
    return(
      <div className='App'>
        
        {
           this.state.loggedIn
           ?

           <ChrisListsContainer 
             logout={this.logout} 
             user={this.state.loggedInUser}
           />

           :
          
           <LoginRegisterForm 
             login={this.login} 
             register={this.register}
           />
         
        }

      </div>
    );
  }
}

export default App;