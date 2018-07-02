import React, { Component } from 'react';
import { filter as fuzzyFilter } from 'fuzzy';
import maybeVeganList from 'is-not-vegan/src/util/canbevegan.json';
import nonVeganList from 'is-not-vegan/src/util/nonvegan.json';
import { checkIngredients } from 'is-not-vegan';

import Results from './Components/Results';
import Input from './Containers/Input';

import './App.css';

const initialState = {
  ingredient: '',
  ingredientChecked: {
    nonvegan: [],
    flagged: [],
    other: []
  },
  autoSuggestList: []
};

const getMatches = (value, list) => {
  return fuzzyFilter(value, list).map(el => el.string);
};

const getAutoSuggestList = ingredients => {
  if (ingredients.length < 3 || !ingredients.length) {
    return;
  }
  const nonVeganMatches = getMatches(ingredients, nonVeganList);
  const maybeVeganMatches = getMatches(ingredients, maybeVeganList);
  // console.log([...nonVeganMatches, ...maybeVeganMatches]);
  return [...nonVeganMatches, ...maybeVeganMatches];
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    if (!e.target.value.length) {
      this.setState(initialState);
      return;
    }

    const ingredient = e.target.value;
    const ingredientChecked = checkIngredients([ingredient]);
    const autoSuggestList = getAutoSuggestList(ingredient);
    return this.setState({
      ingredient,
      ingredientChecked,
      autoSuggestList
    });
  }

  render () {
    const { nonvegan, flagged, other } = this.state.ingredientChecked;

    return (
      <div className='App'>

        <header className='App-header'>
          <h1 className='App-title'>Vegan checker</h1>
        </header>

        <div className='App-info'>
          <span className='App-info-nonvegan'>Not vegan</span>
          <span className='App-info-flagged'>Can be vegan</span>
          <span className='App-info-other'>No data</span>
        </div>

        <span className='App-result'>
          <Results nonvegan={nonvegan} flagged={flagged} other={other} />
        </span>

        <div className='App-form'>
          <form onSubmit={e => e.preventDefault()} autoComplete='off'>
            <input
              required
              type='text'
              name='ingredient'
              placeholder='pork, soy, biotin...'
              className='App-input'
              onChange={this.handleChange}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = 'pork, soy, biotin...')}
              />
          </form>
        </div>

        <Input test={'test'} />

      </div>
    );
  }
}

export default App;
