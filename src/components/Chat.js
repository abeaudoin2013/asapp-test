import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.user = props.user;
  }
  render() {
    return (
      <div className="Chat">
        <p>You are {this.state.user.firstName} {this.state.user.lastName}</p>
      </div>
    );
  }
}

export default Chat;
