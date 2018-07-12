/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import Results from './Results';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
  nonvegan: [],
  flagged: [],
  other: []
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Results {...defaultProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders nonvegan info', () => {
  defaultProps.nonvegan = ['pork'];
  const wrapper = shallow(<Results {...defaultProps} />);
  expect(wrapper.find('.Results-nonvegan-info').length).toEqual(1);
});

it('renders flagged info', () => {
  defaultProps.flagged = ['biotin'];
  const wrapper = shallow(<Results {...defaultProps} />);
  expect(wrapper.find('.Results-flagged-info').length).toEqual(1);
});

it('renders other info', () => {
  defaultProps.other = ['soy'];
  const wrapper = shallow(<Results {...defaultProps} />);
  expect(wrapper.find('.Results-other-info').length).toEqual(1);
});
