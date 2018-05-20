import React, { Component } from 'react';
import './App.css';
import Countdown from './Countdown'

// Random component
const Completionist = () => <span>You are good to go!</span>;

// const MINUTES = 1000 * 60;

class App extends Component {
  render() {
    return (
      <Countdown
        // date={Date.now() + (5 * MINUTES)}
        date={Date.now() + 5000}
      >
        <Completionist />
      </Countdown>
    );
  }
}

export default App;
