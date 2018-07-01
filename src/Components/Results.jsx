import React from 'react';
import PropTypes from 'prop-types';

import './Results.css';

Results.PropTypes = {
  nonvegan: PropTypes.array,
  flagged: PropTypes.array,
  other: PropTypes.array
};

export default function Results ({ nonvegan, flagged, other }) {
  return (
    <React.Fragment>
      <div className='Results-container'>
        {
          !other.length && !nonvegan.length && !flagged.length
            ? <span className='Results-other'>?</span>
            : null
        }
        {
          other.length
            ? other.map(i => <span className='Results-other'>{i}</span>)
            : null
        }
        {
          nonvegan.length
            ? nonvegan.map(i => <span className='Results-nonvegan'>{i}</span>)
            : null
        }
        {
          flagged.length
            ? flagged.map(i => <span className='Results-flagged'>{i}</span>)
            : null
        }
      </div>
    </React.Fragment>
  );
}
