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
  }

  callAPI = () => {
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
          <Grid item xs={6} className="Form-prompt">
            Facebook login email
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth
              onChange={e => this.setState({ email: e.target.value })}/>
          </Grid>
          <Grid item xs={6} className="Form-prompt">
            Facebook password
          </Grid>
          <Grid item xs={6}>
            <TextField 
              type="password"
              fullWidth
              onChange={e => this.setState({ password: e.target.value })} />
          </Grid>
          <Grid item xs={6} className="Form-prompt">
            Recipients (separate by commas)
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth
              onChange={e => this.setState({ recipients: e.target.value })}/>
          </Grid>
          <Grid item xs={6} className="Form-prompt">
            Message
          </Grid>
          <Grid item xs={6}>
            <TextField 
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={e => this.setState({ message: e.target.value })}/>
          </Grid>
          <Grid item xs={12}>
            <Button 
              onClick={this.callAPI}
              variant="contained" >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
