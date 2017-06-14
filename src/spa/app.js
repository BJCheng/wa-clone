import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Increment from './increment.react.js';

import './normalize.scss'; 

ReactDOM.render(<Increment/>, document.getElementById('root'));