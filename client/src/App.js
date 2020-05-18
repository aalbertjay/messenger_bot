import React, { Component } from 'react';
import { Button, Container, TextField, Checkbox } from '@material-ui/core';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: '',
      email: '',
      password: '',
      message: '',
      recipients: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value    
    });
  }

  // Send a message
  sendMessage(event) {    
    var url = 'http://localhost:9000/messages';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
    event.preventDefault();
  }

  render() {
    return (
      <Container maxWidth="sm">
          <h1>DM Bot</h1>
          Send your message to a bunch of people at once. 90% reply rate guaranteed, 50% of the time!
            <form onSubmit={this.sendMessage}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Facebook login email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleInputChange} />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Facebook password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleInputChange} />
              <TextField
                margin="normal"
                required
                fullWidth
                id="recipients"
                label="Recipients (separate by commas)"
                name="recipients"
                onChange={this.handleInputChange} />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                multiline
                rows={4}
                onChange={this.handleInputChange} />
              <Checkbox>
                Show Variables
              </Checkbox>
              <Button
                type="submit"
                variant="contained"
                color="primary" >
                Send Message
              </Button>
              
            </form>
      </Container>
    );
  }
}

export default App;
