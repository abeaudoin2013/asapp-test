import React, { Component } from 'react';
import _ from 'lodash';
// import update from 'immutability-helper';
import Chat from "./Chat";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.users = props.users;
    this.state.conversation = [];

    this.updateConversation = this.updateConversation.bind(this);
    this.updateTyping = this.updateTyping.bind(this);

  }
  updateConversation(arg1) {

    this.setState({
      conversation: [...this.state.conversation, arg1]
    })

  }
  updateTyping(arg1) {
    const a = _.map(this.state.users, (v, i) =>{
      if (v.Id === arg1.Id) {
        let b = v;
        b.isTyping = !b.isTyping;
        return b;
      } else {
        return v;
      }
    });
    this.setState({
      users: a
    });

  }
  render() {

    let chats = _.map(this.state.users, (v,i) => {
      return <Chat
        key={"Chat--" + i}
        user={this.state.users[i]}
        chatee={i === this.state.users.length - 1 ? this.state.users[0] : this.state.users[i + 1]}
        conversation={this.state.conversation}
        updateConversation={this.updateConversation}
        updateTyping={this.updateTyping}/>
    });

    return (
      <div className="Conversation">
        {chats}
      </div>
    );
  }
}

export default Conversation;
