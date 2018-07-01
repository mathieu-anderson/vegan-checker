import React from 'react';
import PropTypes from 'prop-types';

Results.PropTypes = {
  nonvegan: PropTypes.array,
  flagged: PropTypes.array,
  other: PropTypes.array
};

export default function Results ({ nonvegan, flagged, other }) {
  return (
    <React.Fragment>
      {
        other.length
          ? other.map(i => <span style={{ padding: '0.1em', color: 'grey' }}>{i}</span>)
          : <span style={{ padding: '0.1em' }} />
      }
      {
        nonvegan.length
          ? nonvegan.map(i => <span style={{ padding: '0.1em', color: 'red' }}>{i}</span>)
          : null
      }
      {
        flagged.length
          ? flagged.map(i => <span style={{ padding: '0.1em', color: 'orange' }}>{i}</span>)
          : null
      }
    </React.Fragment>
  );
}
