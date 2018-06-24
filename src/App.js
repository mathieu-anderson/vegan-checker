import React, { Component } from 'react';
// import { filter } from 'fuzzy';
// import Autocomplete from 'react-autocomplete';
// import flaggedList from 'is-not-vegan/src/util/canbevegan.json';
// import nonVeganList from 'is-not-vegan/src/util/nonvegan.json';
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
  return ingredients.split(/[ ,][ ;]+/);
};

class App extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange (e) {
    // const fuzzyResults = filter(e.target.value, nonVeganList);
    // var matches = fuzzyResults.map((el) => el.string);
    // console.log(matches);
    await this.setState({
      ...initialState,
      ingredients: e.target.value
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
