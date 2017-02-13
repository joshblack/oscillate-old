import React from 'react';
import cx from 'classnames';

const isIe = window.ActiveXObject || 'ActiveXObject' in window;

const Loader = ({ active }) => {
  const className = cx(
    'loader',
    {
      'loader--ie': isIe,
      'loader--stop': !active,
      'loader--stop--ie': !active && isIe,
    },
  );

  return (
    <div className={className}>
      <svg className="loader__svg" viewBox="-75 -75 150 150">
        <circle cx="0" cy="0" r="37.5" />
      </svg>
    </div>
  );
};

Loader.propTypes = {
  active: React.PropTypes.bool.isRequired,
};

export default Loader;
