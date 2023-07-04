import React from 'react';
import './App.css';
import { List } from './components/List';
import { Nav } from './components/Nav';

function App() {
  return (
    <div className="App" >      
      <Nav />
      <List />
    </div>
  );
}

export default App;
