import React, { Component } from 'react';
import users from '../users.js'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      invalidCredentials: false
    };
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.checkCredentials()) {
      this.props.onSubmit(true);
    } else {
      this.setState({invalidCredentials: "Invalid Credentials"})
    }
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  checkCredentials = () => {
    if (users[this.state.email]) {
      if (users[this.state.email] === this.state.password) {
        return true
      }
    } else {
      return false
    }
  }

  render () {
    return(
      <form onSubmit={this.handleSubmit}>
      Email:
      <input required type="email" name="email" value={this.state.email} onChange={this.handleInputChange}/>
      Last name:
      <input required type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
      <p>{this.state.invalidCredentials}</p>
      <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Login;
