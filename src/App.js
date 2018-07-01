import React, { Component } from 'react';
import { filter as fuzzyFilter } from 'fuzzy';
// import Autocomplete from 'react-autocomplete';
import maybeVeganList from 'is-not-vegan/src/util/canbevegan.json';
import nonVeganList from 'is-not-vegan/src/util/nonvegan.json';
import { checkIngredients } from 'is-not-vegan';

import './App.css';

const initialState = {
  ingredient: '',
  ingredientChecked: {
    nonvegan: [],
    flagged: []
  },
  autoCompleteList: []
};

const getMatches = (value, list) => {
  return fuzzyFilter(value, list).map(el => el.string);
};

const getAutoCompleteList = ingredients => {
  if (ingredients.length < 3 || !ingredients.length) {
    return;
  }
  const nonVeganMatches = getMatches(ingredients, nonVeganList);
  const maybeVeganMatches = getMatches(ingredients, maybeVeganList);
  return [...nonVeganMatches, ...maybeVeganMatches];
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const ingredient = e.target.value;
    const ingredientChecked = checkIngredients([ingredient]);
    const autoCompleteList = getAutoCompleteList(ingredient);
    return this.setState({
      ...initialState,
      ingredient,
      ingredientChecked,
      autoCompleteList
    });
  }

  render () {
    const { ingredient, ingredientChecked } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Vegan checker</h1>
        </header>
        <span className='App-result'>
          {
            <React.Fragment>
              {ingredient.length ? null : <span style={{ padding: '0.5em', color: 'grey' }}>?</span>}
              {ingredientChecked.nonvegan.map(i => <span style={{padding: '0.5em', color: 'red'}}>{i}</span>)}
              {ingredientChecked.flagged.map(i => <span style={{padding: '0.5em', color: 'orange'}}>{i}</span>)}
              {
                !ingredientChecked.nonvegan.includes(ingredient) && !ingredientChecked.flagged.includes(ingredient)
                ? <span style={{ padding: '0.5em', color: 'grey' }}>{ingredient}</span>
                : null
            }
            </React.Fragment>
          }
        </span>

        <div className='App-form'>
          <form onSubmit={e => e.preventDefault()} autoComplete='off'>
            <input
              required
              type='text'
              name='ingredients'
              placeholder='pork, soy, biotin...'
              className='App-input'
              onChange={this.handleChange}
              />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
