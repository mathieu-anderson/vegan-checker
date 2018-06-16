import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Vegan checker</h1>
        </header>
        <p className='App-intro'>

          <form>
            Is
            <input type='text' name='ingredient' placeholder='ingredient' className='App-input' />
            vegan ?
            <input type='submit' name='submit' value='check!' className='App-submit' />
          </form>
        </p>
      </div>
    );
  }
}

export default App;
