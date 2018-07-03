import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { filter as fuzzyFilter } from 'fuzzy';
import { checkIngredients } from 'is-not-vegan';

import maybeVeganList from 'is-not-vegan/src/util/canbevegan.json';
import nonVeganList from 'is-not-vegan/src/util/nonvegan.json';

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
    .filter(el => el.score >= 10)
    .map(el => el.string);
};

const getSuggestions = value => {
  return getMatches(value, [...nonVeganList, ...maybeVeganList]);
};

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class Input extends Component {
  constructor () {
    super();
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onChange (event, { newValue }) {
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
    const { value, suggestions } = this.state;
    const { test } = this.props;
    console.log(test);

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={value => value}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Input;
