import React from 'react';
import './App.css';
import { Add } from './components/Add';
import { List } from './components/List';
import { Nav } from './components/Nav';

function App() {
  return (
    <div className="App">      
      <Nav />
      <Add />
      <List />
    </div>
  );
}

export default App;
