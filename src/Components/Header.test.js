/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import Header from './Header';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders h1', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('h1').length).toEqual(1);
});

it('renders img', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('img').length).toEqual(1);
});
