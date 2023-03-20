import React from 'react';
import './App.css';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
    <div className="App">
      <h1>BlackTourmaline</h1>

      <div className="d-flex flex-row m-3">
        <div className="p-2 align-self-center">
          <img src="logo190.png" alt="" />
        </div>
        <div className="p-2">
          <h2 className='text-danger'><FontAwesomeIcon icon={faBan} /></h2>
          <h1 className='text-info'>Site Bloqueado!</h1>
        </div>
      </div>
    </div>
  );
}

export default App;