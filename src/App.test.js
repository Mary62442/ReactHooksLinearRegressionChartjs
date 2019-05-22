import React from 'react';
import ReactDOM from 'react-dom';
import LinearRegression from './LinearRegressionComponent/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LinearRegression />, div);
  ReactDOM.unmountComponentAtNode(div);
});
