import React from 'react';
import PropTypes from 'prop-types';

import reload from '../reload.svg';
import './Header.css';

Header.propTypes = {
  onClick: PropTypes.func
};

export default function Header (props) {
  return (
    <header className='Header-container'>
      <h1 className='Header-title Header-reload' onClick={props.onClick}>Vegan checker</h1>
      <img src={reload} className='Header-reload' alt='reload' onClick={props.onClick} />
    </header>
  );
}
