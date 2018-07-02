import React from 'react';
import PropTypes from 'prop-types';

import './Results.css';

Results.propTypes = {
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
            ? <span className='Results-other'>{other[0]}</span>
            : null
        }
        {
          nonvegan.length
            ? <span className='Results-nonvegan'>{nonvegan[0]}</span>
            : null
        }
        {
          flagged.length
            ? <span className='Results-flagged'>{flagged[0]}</span>
            : null
        }
      </div>
    </React.Fragment>
  );
}
