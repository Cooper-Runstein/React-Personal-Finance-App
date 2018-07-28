import React from 'react';
import PropTypes from 'prop-types';

const StartIncomeLinkForm = (props)=>{
  return (
    <div className="start-link-container">
      <button>Link expense to a loan</button>
    </div>
)
}

StartIncomeLinkForm.propTypes = {
    growth: PropTypes.number.isRequired,
    pendingGrowth: PropTypes.string.isRequired
}

export default StartIncomeLinkForm;
