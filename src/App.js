import React, { Component } from 'react';
import { isVeganIngredient } from 'is-vegan';
import checkIngredients from 'is-vegan/src/modules/IngredientChecker';
// TODO submit pr to repo to fix faulty export

import './App.css';

const initialState = {
  ingredients: '',
  formattedIngredients: [],
  isVegan: false,
  result: '?',
  isVeganList: {}
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

    if (formattedIngredients.length === 1) {
      return isVeganIngredient(...formattedIngredients)
        ? this.setState({ isVegan: true, result: this.state.ingredients })
        : this.setState({ isVegan: false, result: this.state.ingredients });
    } else {
      return this.setState({
        formattedIngredients: formattedIngredients,
        isVeganList: checkIngredients(formattedIngredients)
      });
    }
  }

  render () {
    const { isVegan, isVeganList, result, formattedIngredients } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Vegan checker</h1>
        </header>
        {
        Object.keys(isVeganList).length
          ? <p className='App-result'>
            {isVeganList.nonvegan.map(i => <span style={{padding: '1em', color: 'red'}}>{i}</span>)}
            {isVeganList.flagged.map(i => <span style={{padding: '1em', color: 'orange'}}>{i}</span>)}
            {
              formattedIngredients.filter(i => {
                return !isVeganList.nonvegan.includes(i) && !isVeganList.flagged.includes(i);
              }).map(i => <span style={{ padding: '1em', color: 'green' }}>{i}</span>)
            }
          </p>
          : <p className='App-result'>{
            isVegan
              ? <p style={{ color: 'green' }}>{result}</p>
              : <p style={{ color: 'red' }}>{result}</p>
            }</p>
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
