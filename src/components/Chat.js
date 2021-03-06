import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-flexbox-grid';
import Message from "./Message";
import Profile from "./Profile";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.attachedImagePreview = "";
    // this.state.randomGif = "";
    // this.state.randomGifSlug = "";

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.attachImage = this.attachImage.bind(this);
    this.deleteAttachedImage = this.deleteAttachedImage.bind(this);
    this.returnGif = this.returnGif.bind(this);

  }
  componentWillMount() {
    
  }
  returnGif(arg, arg2) {
    const n = Math.floor(Math.random() * (4 - 0 + 1) ) + 0, self = this;
    const queryReducer =  (accumulator, currentValue, index, array) => index === array.length - 1 ? accumulator + currentValue + '&api_key=NF2IhcnuxwpvEe5huzaBIPErDtFN7mbK&limit=5' :  accumulator + currentValue + '+';
    let queryString = arg.length > 1 ? arg.reduce(queryReducer, 'http://api.giphy.com/v1/gifs/search?q=') : 'http://api.giphy.com/v1/gifs/search?q=' + arg[0] + '&api_key=NF2IhcnuxwpvEe5huzaBIPErDtFN7mbK&limit=5';

    fetch(queryString)
    .then(function(response) {
      if(response.ok) {
        response.json().then(function(json) {
          let g = json.data[n],
              h= {
                gif: g.images.fixed_height.url,
                gifWidth: g.images.fixed_height.width,
                gifSlug: g.images.slug
              };
              console.log(g);
          const i = _.extend(h, arg2);
          self.props.updateConversation(i);
          self.props.updateTyping(self.props.user);
          self.setState({
            attachedImagePreview: ""
          });
        });
      } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
      }
    });
  }
  handleKeyUp(e) {
    let a = e.target.value, b = this.props.user, c={};

    if (a !== "") {

      if (!b.isTyping) {
        this.props.updateTyping(b);
      }

      if (e.key === "Enter") {
        
        let d = a.split(" "),
        wordsToSendToGif = [],
        message = d.map(word => {
          if (word.includes("_")) {
            let f = word.split("_");
            if (f.length === 3) {
              wordsToSendToGif.push(f[1]);
              return f[1];
            }
          } else {
            return word;
          }
        });

        let g = "";

        g = message.reduce((acc, word) => {
          return acc + " " + word;
        });

        if (wordsToSendToGif.length > 0) {
          console.log("words to send to gif");
          c.text = g;
          c.sender = this.props.user;
          c.receiver = this.props.chatee;
          c.date = new Date();
          c.image = this.state.attachedImagePreview;
          e.target.value = "";
          document.getElementById("image-upload-" + c.sender.Id).value = "";
          this.returnGif(wordsToSendToGif, c);
        } else {
          console.log("no words to send to gif");
          c.text = a;
          c.sender = this.props.user;
          c.receiver = this.props.chatee;
          c.date = new Date();
          c.image = this.state.attachedImagePreview;
          e.target.value = "";
          document.getElementById("image-upload-" + c.sender.Id).value = "";
          this.props.updateConversation(c);
          this.props.updateTyping(b);
          this.setState({
            attachedImagePreview: ""
          });
        }
        


      }

    } else {
      if (b.isTyping) {
        this.props.updateTyping(b);
      }
    }
  }
  attachImage(e) {
    const reader = new FileReader();
    const self = this;

  
    if (e.target.files[0] !== undefined) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
        self.setState({
          attachedImagePreview: reader.result
        });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }  

  }
  deleteAttachedImage(e) {
    e.preventDefault();
    document.getElementById("image-upload-" + this.props.user.Id).value = "";
    this.setState({
      attachedImagePreview: ""
    });
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

    let attachedImagePreview = (
      <div className="AttachImage-preview">
        <div className={"AttachImage-close"} onClick={(e) => {this.deleteAttachedImage(e)}}>X</div>
        <img src={this.state.attachedImagePreview} width={"100%"} className={"AttachImage-preview-img"} alt="attached"/>
      </div>
    );

    return (
      <div className="Chat">
        <div className="--container">

          <div className="Intro">
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className={"-Greeting"}>Hey, <b onClick={(e) => {this.props.toggleProfile(e, this.props.user)}}>{this.props.user.firstName}</b></div>
              </Col>
            </Row>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3}>
                <div
                  style={
                    {background: 'url(' + this.props.chatee.avatar + ') no-repeat', 
                    backgroundSize: 'cover', backgroundPosition: 'center'}
                  } 
                  className={"-Avatar"} 
                  width={"100%"} 
                  onClick={(e) => {
                    this.props.toggleProfile(e, this.props.chatee)}
                  } 
                  alt={this.props.chatee.userName}/>
              </Col>
              <Col xs={9} sm={9} md={9} lg={9}>
                <p>You are chatting with . . .</p>
                <div className={"About"}>
                  {this.state.randomGif ? <img src={this.state.randomGif} alt={this.state.randomGifSlug} width={this.state.randomGifWidth} /> : ""}
                  <div 
                    className={"-UserName"} 
                    onClick={(e) => {
                      this.props.toggleProfile(e, this.props.chatee)}
                    }>{this.props.chatee.userName}</div>
                  <div className={"-FullName"}><span className={"-First name"}>{this.props.chatee.firstName}</span> <span className={"-Last name"}>{this.props.chatee.lastName}</span></div>
                </div>

                {this.props.showProfile.show ? <Profile user={this.props.showProfile.profile} coordinates={this.props.coordinates}/> : ""}
              </Col>
            </Row>
          </div>

          {messages}

          <input type="text" className={"Input"} placeholder={"Message " + this.props.chatee.userName} onKeyUp={(e)=>{this.handleKeyUp(e)}}/>
          <div className="AttachImage">
            <input type="file" id={"image-upload-" + this.props.user.Id} className={"AttachImage-Input"} onChange={this.attachImage}/>
            {this.state.attachedImagePreview !== "" ? attachedImagePreview : ""}
          </div>
          <p className={"Giphy-thing"}>Send a gif by adding underscores like _this_</p>

          <p>{isTyping}</p>
        </div>
      </div>
    );
  }
}

export default Chat;
