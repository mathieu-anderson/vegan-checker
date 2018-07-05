import React from 'react';
import PropTypes from 'prop-types';

import './Results.css';

Results.propTypes = {
  nonvegan: PropTypes.array,
  flagged: PropTypes.array,
  other: PropTypes.array
};

const getLink = (str, cat) => {
  const formattedStr = str.replace(/ /g, '+');
  return `https://www.google.be/search?q=${formattedStr}${cat}`;
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
            ? <div className='Results-other-info'>No data. <a href={getLink(other[0], '+vegan')}>Learn more.</a></div>
            : null
        }
        {
          nonvegan.length
            ? <div className='Results-nonvegan-info'>
                Not vegan. <a href={getLink(nonvegan[0], '+not+vegan')}>Learn more.</a>
            </div>
            : null
        }
        {
          flagged.length
            ? <div className='Results-flagged-info'>
              Sometimes vegan. <a href={getLink(flagged[0], '+not+vegan')}>Learn more.</a>
            </div>
            : null
        }
      </div>
    </React.Fragment>
  );
}
