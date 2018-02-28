import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Profile extends Component {
  render() {
    return (
      <div className={"Profile"} style={{top: this.props.coordinates.y, left: this.props.coordinates.x + 50}}>
        <div className="--image">
          <img src={this.props.user.avatar} width={"100%"} alt={this.props.user.username}/>
        </div>

        <div className={"Info"}>
          <Grid fluid>
            <Row className={"--row"}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div className={"-Property"}>Username: </div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div className={"-Values"}>{this.props.user.userName}</div>
              </Col>
            </Row>
            <Row className={"--row"}>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div className={"-Property"}>Name: </div>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <div className={"-Values"}>{this.props.user.firstName} {this.props.user.lastName}</div>
              </Col>
            </Row>
            <Row className={"--row"}>
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className={"-Property"}>Bio: </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12}>
                <div className={"-Values"}>{this.props.user.bio}</div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Profile;
