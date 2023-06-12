import React from 'react';
import './App.css';
import { Add } from './components/Add';
import { List } from './components/List';

function App() {
  return (
    <div className="App">
      <header>Add your expense here</header>
      <Add />
      <List />
    </div>
  );
}

export default App;
