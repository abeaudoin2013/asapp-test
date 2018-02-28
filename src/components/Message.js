import React, { Component } from 'react';
import Moment from 'react-moment';

class Message extends Component {
  render() {
    return (
      <div className={this.props.message.sender.userName === this.props.user.userName ? "Message --fromSameUser" : "Message"}>
        <div className={"--container"}>

          <div className={"Avatar item"}>
            <img src={this.props.message.sender.avatar} alt={this.props.message.sender.userName} width={"100%"}/>
          </div>

          <div className={"Content item"}>
            <div className="--sender">
              <span className={"Time item"}><Moment format={"MM/DD/YYYY h:mm a"}>{this.props.message.date}</Moment></span>
              <span className={"UserName item"}>{this.props.message.sender.userName}</span>
            </div>
            <p className="--message">{this.props.message.text}</p>
          </div>

        </div>

      </div>
    );
  }
}

export default Message;
