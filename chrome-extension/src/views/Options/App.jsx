import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css'
import { db } from '../../models/db';
import './App.css'
import { Nav } from './components/template/Nav'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  const [token, setToken] = useState()
  const [show, setShow] = useState("signin")
  const [signup, setSignup] = useState({})

  if (!token) {
    if (show === 'signin') {
      return (
        <div>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Login classname="d-flex flex-column align-items-center" setToken={setToken} setShow={setShow} />
        </div>
      )

    } else {

      return (
        <div>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Signup classname="d-flex flex-column align-items-center" setSignup={setSignup} setShow={setShow} />
        </div>
      )
    }
  }

  const render = () => {
    return (
      <div className="App">
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <header className="App-header">
        </header>
        <Nav />
      </div>
    )
  }

  db.checkDatabase(token)
  return render()
}

export default App
