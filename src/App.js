import React, { Component } from 'react';
import { filter as fuzzyFilter } from 'fuzzy';
// import Autocomplete from 'react-autocomplete';
import maybeVeganList from 'is-not-vegan/src/util/canbevegan.json';
import nonVeganList from 'is-not-vegan/src/util/nonvegan.json';
import { checkIngredients } from 'is-not-vegan';

import './App.css';

const initialState = {
  ingredients: '',
  formattedIngredients: [],
  ingredientsList: {
    nonvegan: [],
    flagged: []
  }
};

const formatIngredients = ingredients => {
  return ingredients.split(',');
};

const getMatches = (value, list) => {
  return fuzzyFilter(value, list).map(el => el.string);
};

const getAutoCompleteList = ingredients => {
  // this only works with single ingredients
  // refocus app to check one ingredient at the time?
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

  async handleChange (e) {
    await this.setState({
      ...initialState,
      ingredients: e.target.value,
      autoCompleteList: getAutoCompleteList(e.target.value)
    });
    const formattedIngredients = await formatIngredients(this.state.ingredients);
    return this.setState({
      formattedIngredients: formattedIngredients,
      ingredientsList: checkIngredients(formattedIngredients)
    });
  }

  render () {
    const { ingredientsList, formattedIngredients } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Vegan checker</h1>
        </header>
        <span className='App-result'>
          {
            <React.Fragment>
              {formattedIngredients.length ? null : <span style={{ padding: '0.5em', color: 'grey' }}>?</span>}
              {ingredientsList.nonvegan.map(i => <span style={{padding: '0.5em', color: 'red'}}>{i}</span>)}
              {ingredientsList.flagged.map(i => <span style={{padding: '0.5em', color: 'orange'}}>{i}</span>)}
              {
                formattedIngredients.filter(i => {
                  return !ingredientsList.nonvegan.includes(i) && !ingredientsList.flagged.includes(i);
                }).map(i => <span style={{ padding: '0.5em', color: 'grey' }}>{i}</span>)
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
