import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    status: null
  }

  handleOnClick(evt) {
    const eventSource = new EventSource('http://localhost:2112/api/localize');
    console.log('[PORT OPEN FROM CLIENT]')
    
    eventSource.onmessage = (evt) => {
      this.setState({
        status: evt.data
      })

      console.log(evt)

      if (evt.data === "CLOSE PORT") {
        eventSource.close();
        console.log('[PORT CLOSED FROM CLIENT]')
      }
    }
  }
    
  renderStatus() {
    return (
      <p className="status-text">{this.state.status}</p>
    )
  }
  
  render() {
    return (
      <div className="wrapper">
      {this.renderStatus()}
        <div className="selector">
          <button className="btn" onClick={(evt) => this.handleOnClick(evt)}>Localize me</button>
        </div>
      </div>
    );
  }
}

export default App;
