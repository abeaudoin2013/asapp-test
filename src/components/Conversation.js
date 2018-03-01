import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Chat from "./Chat";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.users = props.users;
    this.state.conversation = [];
    this.state.showProfile = {
      show: false,
      profile: ""
    };
    this.state.coordinates = {};

    this.updateConversation = this.updateConversation.bind(this);
    this.updateTyping = this.updateTyping.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
    this.handleClickOutsideProfile = this.handleClickOutsideProfile.bind(this);

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
  toggleProfile(e, profile) {
    this.setState({
      showProfile: {
        show: !this.state.showProfile.show,
        profile: profile
      },
      coordinates: {
        x: e.clientX,
        y: e.clientY
      }
    });
  }
  handleClickOutsideProfile(e) {
    if (!e.target.closest(".Profile") && this.state.showProfile.show) {
      this.setState({
        showProfile: {
          show: false,
          profile: ""
        }
      });
    }
  }
  render() {

    let chats = _.map(this.state.users, (v,i) => {
      return (
        <Col key={"Col-Chat--" + i} xs={12} sm={12} md={6} lg={6}>
          <Chat
            key={"Chat--" + i}
            user={this.state.users[i]}
            chatee={i === this.state.users.length - 1 ? this.state.users[0] : this.state.users[i + 1]}
            conversation={this.state.conversation}
            updateConversation={this.updateConversation}
            updateTyping={this.updateTyping}
            showProfile={this.state.showProfile}
            toggleProfile={this.toggleProfile}
            coordinates={this.state.coordinates}/>
        </Col>);
    });

    return (
      <div className="Conversation" onClick={(e)=>{this.handleClickOutsideProfile(e)}}>
        <Grid fluid>
          <Row>
            {chats}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Conversation;
