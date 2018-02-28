import React, { Component } from 'react';
import Moment from 'react-moment';

class Message extends Component {
  render() {
    return (
      <div className={this.props.message.sender.userName === this.props.user.userName ? "Message --fromUser" : "Message --fromChatee"}>
        <div className={"--container"}>

          <div className={"Avatar item"} onClick={(e)=>{this.props.toggleProfile(e, this.props.message.sender)}}>
            <img src={this.props.message.sender.avatar} alt={this.props.message.sender.userName} width={"100%"}/>
          </div>

          <div className={"Content item"}>
            <div className="--sender">
              <span className={"UserName item"}>{this.props.message.sender.userName}</span>
              <span className={"Time item"}><Moment format={"h:mm a"}>{this.props.message.date}</Moment></span>
            </div>
            <p className="--message">{this.props.message.text}</p>
          </div>

        </div>

      </div>
    );
  }
}

export default Message;
