import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './views/options/App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
); 
