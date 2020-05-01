import React, { Component } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
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
      <div className="App">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>DM Bot</h1>
          </Grid>
          <Grid item xs={12} >
            Send your message to a bunch of people at once. 90% reply rate guaranteed, 50% of the time!
          </Grid>
          <Grid item xs={12}>
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
              <Button
                type="submit"
                variant="contained"
                color="primary" >
                Send Message
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
