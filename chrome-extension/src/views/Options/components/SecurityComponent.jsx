import React, { useState, useEffect } from "react";
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import Main from './template/Main'

export default function SecurityComponent(props) {

    const headerProps = {
        icon: faShieldAlt,
        title: 'Segurança',
        subtitle: 'Mudança de Senhas !'
    }

    const [id, setId] = useState(-1)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const save = () => {

        /* const url = preference.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            }) */
    }   

    const form = () => {
        return (
            <form>
                <div className="d-flex flex-column justify-content-between flex-fill">
                    <div className="d-flex flex-column align-items-center justify-content-center p-2 flex-fill">
                        <label className="form-label" htmlFor="senha-antiga">
                            Senha Antiga
                            <input className="form-control" type="password" onChange={e => setOldPassword(e.target.value)} value={oldPassword} />
                        </label>
                        <label className="form-label" htmlFor="senha-nova">
                            Senha Nova
                            <input className="form-control" type="password" onChange={e => setNewPassword(e.target.value)} value={newPassword} />
                        </label><label className="form-label" htmlFor="senha-confirma">
                            Confirmação de Senha
                            <input className="form-control" type="password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} id="confirm_password" />
                        </label>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary me-2 mb-2">Salvar</button>
                        </div>
                    </div>
                    <hr />

                </div>

            </form>
        )
    }

    return (
        <Main {...headerProps}>
            {form()}
        </Main>
    )
}