import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import MainContainer from './components/MainContainer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
        //<Router>
            <MainContainer />
        //</Router>
    );
  }
}

export default App;
