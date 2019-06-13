import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{ overflow: 'scroll', border: 'none', height: '400px'}}>
      {props.children}
    </div>
  );
};

export default Scroll;