import React, { Component } from 'react';
import { checkIngredients } from 'is-not-vegan';
import Autosuggest from 'react-autosuggest';
import { filter as fuzzyFilter } from 'fuzzy';

import maybeVeganList from 'is-not-vegan/src/util/canbevegan.json';
import nonVeganList from 'is-not-vegan/src/util/nonvegan.json';

import Results from './Components/Results';

import './App.css';

const initialState = {
  value: '',
  valueChecked: {
    nonvegan: [],
    flagged: [],
    other: []
  },
  suggestions: []
};

const getMatches = (value, list) => {
  return fuzzyFilter(value, list)
    .filter(match => match.score >= 10)
    .map(match => match.string)
    .slice(0, 10);
};

const getSuggestions = value => {
  return getMatches(value, [...nonVeganList, ...maybeVeganList]);
};

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  handleChange (e, { newValue }) {
    if (!newValue.length) {
      this.setState(initialState);
      return;
    }
    const valueChecked = checkIngredients([newValue]);

    this.setState({
      value: newValue,
      valueChecked
    });
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  }

  render () {
    const { value, suggestions, valueChecked } = this.state;
    const { nonvegan, flagged, other } = valueChecked;
    const inputProps = {
      className: 'App-input',
      placeholder: 'pork, soy, biotin...',
      value,
      onChange: this.handleChange,
      onFocus: (e) => (e.target.placeholder = ''),
      onBlur: (e) => (e.target.placeholder = 'pork, soy, biotin...')
    };

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
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={value => value}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>

      </div>
    );
  }
}

export default App;
