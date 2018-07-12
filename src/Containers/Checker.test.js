/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Checker from './Checker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Checker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
