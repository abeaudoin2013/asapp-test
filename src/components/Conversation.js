import React, { Component } from 'react';
import Chat from "./Chat";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.users = props.users;
    this.state.conversation = [];

    this.updateConversation = this.updateConversation.bind(this);
  }
  updateConversation(arg1) {
    this.setState({
      conversation: arg1
    });
  }
  render() {

    return (
      <div className="Conversation">
        <Chat
          user={this.state.users[0]}
          chatee={this.state.users[1]}
          conversation={this.state.conversation}
          updateConversation={this.updateConversation}/>
        <Chat
          user={this.state.users[1]}
          chatee={this.state.users[0]}
          updateConversation={this.updateConversation}
          conversation={this.state.conversation}/>
      </div>
    );
  }
}

export default Conversation;
