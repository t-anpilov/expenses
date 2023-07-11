import React from 'react';
import './App.css';
import { List } from './components/List';
import { Nav } from './components/Nav';
import { Statistics } from './components/Statistic';

function App() {
  return (
    <div className="App" >      
      <Nav />
      <List />
      <Statistics />
    </div>
  );
}

export default App;
