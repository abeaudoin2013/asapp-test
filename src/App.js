import React, { Component } from 'react';
import Chat from './components/Chat';
import Users from './Users.json';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.users = Users;
  }
  render() {
    return (
      <div className="App">
        <Chat user={this.state.users[0]}/>
        <Chat user={this.state.users[1]}/>
      </div>
    );
  }
}

export default App;
