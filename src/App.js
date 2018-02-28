import React, { Component } from 'react';
import Conversation from './components/Conversation';
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
        <Conversation users={this.state.users}/>
      </div>
    );
  }
}

export default App;
