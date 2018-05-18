import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Moment from 'react-moment';

class Message extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <Row>
        <Col xs={12} sm={12} mdOffset={this.props.message.sender.userName === this.props.user.userName ? 6 : 0} md={6} lgOffset={this.props.message.sender.userName === this.props.user.userName ? 6 : 0} lg={6}>
          <div className={this.props.message.sender.userName === this.props.user.userName ? "Message --fromUser" : "Message --fromChatee"}>
            <div className={"--container"}>


              <div className={"Content item"}>
                <div className="--sender">
                  <span 
                    className={"UserName item"} 
                    onClick={(e)=>{this.props.toggleProfile(e, this.props.message.sender)}}>{this.props.message.sender.userName}</span>
                  <span className={"Time item"}><Moment format={"h:mm a"}>{this.props.message.date}</Moment></span>
                </div>
                <p className="--message">
                  {this.props.message.gif ? <img src={this.props.message.gif} width={"100%"}/> : ""}
                  {this.props.message.image ? <img src={this.props.message.image} width={"100%"} alt={"attached-message"}/> : ""}
                  {this.props.message.text}
                </p>
              </div>

            </div>

          </div>
        </Col>
      </Row>
    );
  }
}

export default Message;
