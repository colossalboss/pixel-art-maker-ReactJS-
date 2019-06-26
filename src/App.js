import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './SideBar';
import DesignCanvas from './DesignCanvas';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="App">
  
    <SideBar />
    <DesignCanvas />
  </div>
)


export default App;