import React from 'react';
import PropTypes from 'prop-types';

import './Results.css';

Results.propTypes = {
  nonvegan: PropTypes.array,
  flagged: PropTypes.array,
  other: PropTypes.array
};

const getLink = (str) => {
  const formattedStr = str.replace(/ /g, '+');
  return `https://www.google.be/search?q=${formattedStr}`;
};

export default function Results ({ nonvegan, flagged, other }) {
  return (
    <React.Fragment>
      <div className='Results-container'>
        {
          !other.length && !nonvegan.length && !flagged.length
            ? <div className='Results-other-ingredient' />
            : null
        }
        {
          other.length
            ? <div>
              <div className='Results-other-ingredient'>{other[0]}</div>
              <div className='Results-other-info'>No data.</div>
            </div>
            : null
        }
        {
          nonvegan.length
            ? <div>
              <div className='Results-nonvegan-ingredient'>{nonvegan[0]}</div>
              <div className='Results-nonvegan-info'>
                Not vegan. <a href={getLink(nonvegan[0])}>Learn more.</a>
              </div>
            </div>
            : null
        }
        {
          flagged.length
            ? <div>
              <div className='Results-flagged-ingredient'>{flagged[0]}</div>
              <div className='Results-nonvegan-info'>
                Sometimes vegan. <a href={getLink(flagged[0])}>Learn more.</a>
              </div>
            </div>
            : null
        }
      </div>
    </React.Fragment>
  );
}
