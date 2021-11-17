import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRefactored from './AppRefactored';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRefactored />, document.getElementById('root'));
registerServiceWorker();
