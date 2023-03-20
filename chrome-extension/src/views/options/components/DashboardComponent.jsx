import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faGauge, faObjectGroup, faTags } from '@fortawesome/free-solid-svg-icons'
import Main from './template/Main'
import { db } from "../../../models/db"
import AnaliticComponent from "./AnaliticComponent"

export default function DashboardComponent(props) {

    const headerProps = { 
        icon: faGauge,
        title: 'Dashboard',
        subtitle: 'Resumo dos Recursos !' 
    }

    const [counterCategory, setCounterCategory] = useState(0)
    const [counterKey, setCounterKey] = useState(0)
    const [counterUrl, setCounterUrl] = useState(0)

    useEffect(() => {
        db.category.count()
            .then((data) => setCounterCategory(data))
        db.key.count()
            .then((data) => setCounterKey(data))
        db.url.count()
            .then((data) => setCounterUrl(data))
    })

    const formulario = () => {
        return (
            <div className="d-flex flex-col flex-fill m-2">
                <div className="w-100">
                    <div className="d-flex flex-row justify-content-around p-2" >

                        <AnaliticComponent
                            icon={faTags}
                            title={'Categorias'}
                            counter={counterCategory}
                            to="/categories"
                        />

                        <AnaliticComponent
                            icon={faObjectGroup}
                            title={'Chaves'}
                            counter={counterKey}
                            to="/keys"
                        />

                        <AnaliticComponent
                            icon={faLink}
                            title={'URLs'}
                            counter={counterUrl}
                            to="/urls"
                        />

                    </div>
                </div>
            </div>
        )
    }

    return (
        <Main {...headerProps}>
            {formulario()}
        </Main>
    )
}