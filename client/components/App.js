/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header/Header';

const App = () => {
  return (
    <div className="hello">
      <Header />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
