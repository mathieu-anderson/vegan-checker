import React, { Component } from 'react';
import checkIngredients from 'is-vegan/src/modules/IngredientChecker';
// TODO submit pr to repo to fix faulty export

import './App.css';

const initialState = {
  ingredients: '',
  formattedIngredients: [],
  isVeganList: {
    nonvegan: [],
    flagged: []
  }
};

const formatIngredients = ingredients => {
  return ingredients.split(/[ ,]+/);
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({
      ...initialState,
      ingredients: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    const formattedIngredients = formatIngredients(this.state.ingredients);
    return this.setState({
      formattedIngredients: formattedIngredients,
      isVeganList: checkIngredients(formattedIngredients)
    });
  }

  render () {
    const { isVeganList, formattedIngredients } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Vegan checker</h1>
        </header>
        {
          <p className='App-result'>
            {isVeganList.nonvegan.map(i => <span style={{padding: '0.5em', color: 'red'}}>{i}</span>)}
            {isVeganList.flagged.map(i => <span style={{padding: '0.5em', color: 'orange'}}>{i}</span>)}
            {
              formattedIngredients.filter(i => {
                return !isVeganList.nonvegan.includes(i) && !isVeganList.flagged.includes(i);
              }).map(i => <span style={{ padding: '0.5em', color: 'green' }}>{i}</span>)
            }
          </p>
      }

        <div className='App-form'>
          <form onSubmit={this.handleSubmit}>
            <label for='ingredients' >
              Enter the ingredients to check:
            </label>
            <input
              required
              type='text'
              name='ingredients'
              placeholder='pork, soy, biotin...'
              className='App-input'
              onChange={this.handleChange}
            />
            <input
              type='submit'
              name='submit'
              value='Vegan check'
              className='App-submit'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
