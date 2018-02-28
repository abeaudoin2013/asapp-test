import React, { Component } from 'react';
import _ from 'lodash';
import Message from "./Message";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleKeyUp(e) {
    let a = e.target.value, b = this.props.user, c={};

    if (a !== "") {

      if (!b.isTyping) {
        this.props.updateTyping(b);
      }

      if (e.key === "Enter") {
        c.text = a;
        c.sender = this.props.user;
        c.receiver = this.props.chatee;
        c.date = new Date();
        e.target.value = "";
        this.props.updateConversation(c);
        this.props.updateTyping(b);
      }

    } else {
      if (b.isTyping) {
        this.props.updateTyping(b);
      }
    }
  }
  render() {

    let messages = _.map(this.props.conversation, (v, i) => {
      return <Message key={"Message-" + i} message={v} user={this.props.user} chatee={this.props.chatee}/>
    });

    let isTyping;
    if (this.props.chatee.isTyping) {
      isTyping = this.props.chatee.userName + " is typing . . .";
    }
    return (
      <div className="Chat">
        <div className="--container">
          <div className="Intro">
            <p>You are chatting with . . .</p>
            <div className={"Avatar"}>
              <img src={this.props.chatee.avatar} alt={this.props.chatee.userName} width={"100%"}/>
            </div>
            <div className={"UserName"}>{this.props.chatee.userName}</div>
          </div>
          {messages}
          <input type="text" className={"Input"} placeholder={"Message " + this.props.chatee.userName} onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
          {isTyping}
        </div>
      </div>
    );
  }
}

export default Chat;
