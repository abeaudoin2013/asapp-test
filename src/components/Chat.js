import React, { Component } from 'react';
import _ from 'lodash';
import Message from "./Message";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.user = props.user;
    this.state.chatee = props.chatee;
    this.state.conversation = props.conversation;

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleKeyUp(e) {
    let a = e.target.value, b, c = this.state.conversation;
    if (e.key === "Enter" && a !== "") {
      b = {
        text: a,
        sender: this.state.user,
        receiver: this.state.chatee,
        date: new Date()
      };
      c.push(b);
      e.target.value = "";
      this.props.updateConversation(b);
    }
  }
  render() {

    let messages = _.map(this.state.conversation, (v, i) => {
      return <Message key={"Message-" + i} message={v} user={this.state.user} chatee={this.state.chatee}/>
    });

    return (
      <div className="Chat">
        {/*<p>You are {this.state.user.firstName} {this.state.user.lastName}</p>*/}
        <div className="container">
          <p>You are chatting with {this.state.chatee.userName}</p>
          {messages}
          <input type="text" className={"--input"} placeholder={"Message " + this.state.chatee.userName} onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

export default Chat;
