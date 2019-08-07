import React, { Component } from 'react';
import Login from './components/login.js'
import Timeline from './components/timeline.js'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
  }

  handleLogin = success => {
    if (success) {
      this.setState({logged: true})
    }
  }

  render() {

    return (
      <main>
      {this.state.logged ?
        <Timeline />:
        <Login onSubmit={this.handleLogin} />
      }
      </main>
    )
  }
}

export default Main;
