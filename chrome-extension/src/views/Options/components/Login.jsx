import React, { useState } from "react";
import PropTypes from 'prop-types'
import axios from "axios"
import { toast } from 'react-toastify'

export default function Login({ setToken, setShow }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        await axios.post('http://localhost:4000/signin/', { email, password })
            .then(response => {
                const token = response.data
                sessionStorage.setItem('token_tour', JSON.stringify(token));
                setToken(token?.token)
            })
            .catch(err => toast.warn(err.response?.data))
    }

    const handleSignup = async e => {
        e.preventDefault()
        setShow('signup')
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 fw-normal">Login, por gentileza</h1>
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Lembre-me
                    </label>
                </div>
                <div className="d-flex align-items-center">
                    <button class="w-100 btn btn-lg btn-primary me-2" type="submit">Login</button>
                    <button class="w-80 btn btn btn-info" type="button" onClick={handleSignup}>Cadastrar</button>
                </div>
                <p class="mt-5 mb-3 text-muted">&copy; 2015–2023</p>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}