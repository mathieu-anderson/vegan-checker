import React, { Component } from 'react';
import { checkIngredients } from 'is-not-vegan';
import Autosuggest from 'react-autosuggest';
import { filter as fuzzyFilter } from 'fuzzy';

import flaggedList from 'is-not-vegan/src/util/canbevegan.json';
import nonVeganList from 'is-not-vegan/src/util/nonvegan.json';

import Header from '../Components/Header';
import Results from '../Components/Results';

import './Checker.css';

const initialState = {
  value: '',
  valueChecked: {
    nonvegan: [],
    flagged: [],
    other: []
  },
  suggestions: [],
  isOpen: true
};

const getInputClassName = (value, nonvegan, flagged) => {
  if (value === nonvegan[0]) {
    return 'Checker-input Checker-input-nonvegan';
  } else if (value === flagged[0]) {
    return 'Checker-input Checker-input-flagged';
  } else {
    return 'Checker-input';
  }
};

const getSuggestions = value => {
  return fuzzyFilter(value, [...nonVeganList, ...flaggedList])
    .filter(match => match.score >= 10)
    .map(match => match.string)
    .slice(0, 8);
};

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class Checker extends Component {
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
    const { value, suggestions, valueChecked, isOpen } = this.state;
    const { nonvegan, flagged, other } = valueChecked;
    const inputProps = {
      className: getInputClassName(value, nonvegan, flagged),
      placeholder: 'pork, soy, biotin...',
      value,
      onChange: this.handleChange,
      onFocus: (e) => (e.target.placeholder = ''),
      onBlur: (e) => (e.target.placeholder = 'pork, soy, biotin...')
    };

    return (
      <div className='Checker'>

        <Header onClick={() => this.setState(initialState)} />

        <Results
          nonvegan={nonvegan}
          flagged={flagged}
          other={other}
          pose={isOpen ? 'open' : 'closed'}
          hostRef
        />

        <div className='Checker-form'>
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

export default Checker;
