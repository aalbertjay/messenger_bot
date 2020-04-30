import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './App.css';

class SendButton extends Component {

  callAPI = () => {
    console.log('hello');
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  render() {
    return (
      <Button onClick={this.callAPI}>Send Message</Button>
    );
  }
}

export default SendButton;
