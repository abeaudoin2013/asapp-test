import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-flexbox-grid';
import Message from "./Message";
import Profile from "./Profile";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};


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
      return <Message key={"Message-" + i}
                      message={v}
                      user={this.props.user}
                      chatee={this.props.chatee}
                      toggleProfile={this.props.toggleProfile}/>
    });

    let isTyping;
    if (this.props.chatee.isTyping) {
      isTyping = this.props.chatee.userName + " is typing . . .";
    }

    return (
      <div className="Chat">
        <div className="--container">

          <div className="Intro">
            <Row>
              <Col xs={3} sm={3} md={3} lg={3}>
                <img src={this.props.chatee.avatar} className={"-Avatar"} width={"100%"} onClick={(e) => {this.props.toggleProfile(e, this.props.chatee)}} alt={this.props.chatee.userName}/>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9}>
                <div>Hey, <b onClick={(e) => {this.props.toggleProfile(e, this.props.user)}}>{this.props.user.firstName}</b></div>
                <p>You are chatting with . . .</p>
                <div className={"About"}>
                  <div className={"-UserName"} onClick={(e) => {this.props.toggleProfile(e, this.props.chatee)}}>{this.props.chatee.userName}</div>
                  <div className={"-FullName"}><span className={"-First name"}>{this.props.chatee.firstName}</span> <span className={"-Last name"}>{this.props.chatee.lastName}</span></div>
                </div>

                {this.props.showProfile.show ? <Profile user={this.props.showProfile.profile} coordinates={this.props.coordinates}/> : ""}
              </Col>
            </Row>
          </div>

          {messages}

          <input type="text" className={"Input"} placeholder={"Message " + this.props.chatee.userName} onKeyUp={(e)=>{this.handleKeyUp(e)}}/>

          <p>{isTyping}</p>
        </div>
      </div>
    );
  }
}

export default Chat;
