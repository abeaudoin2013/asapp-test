import React, { Component } from 'react';
import Moment from 'react-moment';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.message = props.message;
    this.state.user = props.user;
    this.state.chatee = props.chatee;
  }

  render() {
    return (
      <div className={this.state.message.sender.userName === this.state.user.userName ? "Message fromSameUser" : "Message"}>
        <p>{this.state.message.text}</p>
        <p>from: {this.state.message.sender.userName}</p>
        <p><Moment format={"MM/DD/YYYY HH:mm"}>{this.state.message.date}</Moment></p>
      </div>
    );
  }
}

export default Message;
