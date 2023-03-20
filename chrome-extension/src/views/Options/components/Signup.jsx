import React, { useState } from "react";
import './signup.css'
import PropTypes from 'prop-types'
import axios from "axios";
import { toast } from 'react-toastify'

export default function Signup({ setSignup, setShow }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        axios.post('http://localhost:4000/signup', { name, email, password, confirmPassword })
            .then(response => {
                const user = response.data
                setSignup(user)
            })
            .catch(err => toast.warn(err.response.data))
    }

    const handleSignup = async e => {
        e.preventDefault()
        setShow('signin')
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} >
                <h1 className="h3 mb-3 fw-normal">Cadastrar Novo Usuário</h1>
                <div className="form-floating mb-2">
                    <input type="text" className="form-control" placeholder="Name" onChange={e => setName(e.target.value)} />
                    <label for="floatingInput">Name</label>
                </div>
                <div class="form-floating mb-2">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        class="form-control"
                        placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)} />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} name="password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="password" class="form-control" id="floatingConfirm" placeholder="Confirm" onChange={e => setConfirmPassword(e.target.value)} name="confirm" />
                    <label for="floatingConfirm">Confirm</label>
                </div>
                <div className="d-flex align-items-center">
                    <button class="w-100 btn btn-lg btn-primary me-2" type="submit">Cadastrar</button>
                    <button class="w-80 btn btn btn-info" type="button" onClick={handleSignup}>Fazer Login</button>
                </div>
                <p class="mt-5 mb-2 text-muted">&copy; 2015 - 2023</p>
            </form>
        </div>
    )
}

Signup.propTypes = {
    setToken: PropTypes.func.isRequired
}