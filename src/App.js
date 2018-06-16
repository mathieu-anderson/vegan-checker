import React, { Component } from 'react';
import {
  isVeganIngredient,
  isVeganIngredientList,
  containsNonVeganIngredients
} from 'is-vegan';
import checkIngredients from 'is-vegan/src/modules/IngredientChecker';
// TODO submit pr to repo to fix faulty export

import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ingredients: '',
      isVegan: '?'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({
      ingredients: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(isVeganIngredientList(['soy', 'pork'])); // false
    console.log(containsNonVeganIngredients(['soy', 'pork'])); // ['pork']
    console.log(checkIngredients(['soy', 'cacao butter', 'pork', 'beef', 'glycine']));
    // {
    //   nonvegan: ['pork', 'beef'],
    //   flagged: ['glycine']
    // }

    return isVeganIngredient(this.state.ingredients)
      ? this.setState({ isVegan: 'YES' })
      : this.setState({ isVegan: 'NO' });
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Vegan checker</h1>
        </header>
        <p className='App-result'>{this.state.isVegan}</p>

        <div className='App-intro'>

          <form onSubmit={this.handleSubmit}>
            Is
            <input
              type='text'
              name='ingredient'
              placeholder='ingredient'
              className='App-input'
              onChange={this.handleChange}
            />
            vegan ?
            <input
              type='submit'
              name='submit'
              value='check!'
              className='App-submit'
            />
          </form>
        </div>
        <p>{this.state.ingredients}</p>
      </div>
    );
  }
}

export default App;
