import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import Main from './template/Main'
import { db } from '../../../models/db'

export default function PreferenceComponent(props) {

    const [id, setId] = useState(0)
    const [execute_url, setExecute_url] = useState(true)
    const [execute_title, setExecute_title] = useState(true)
    const [starting_time, setStarting_time] = useState("00:00")
    const [end_time, setEnd_time] = useState("23:59")
    const [ages, setAges] = useState([])
    const [categories, setCategories] = useState([])
    const [ageList, setAgeList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const headerProps = {
        icon: faGears,
        title: 'Preferências',
        subtitle: 'Preferências de funcionamento da extensão!'
    }

    useEffect(() => {
        if (id === 0)
            db.preference
                .get(1)
                .then((data) => {
                    const categories = data.categories.map((c) => ({ value: c.id, label: c.name }))
                    const ages = data.ages.map((a) => ({ value: a.id, label: a.name }))
                    setId(data.id)
                    setExecute_url(data.execute_url)
                    setExecute_title(data.execute_title)
                    setStarting_time(data.starting_time)
                    setEnd_time(data.end_time)
                    setAges(ages)
                    setCategories(categories)
                })

        if (Object.keys(categoryList).length === 0)
            db.category
                .orderBy('name')
                .toArray()
                .then(rows => setCategoryList(rows.map((option) => ({ value: option.id, label: option.name }))))
        if (Object.keys(ageList).length === 0)
            db.age
                .orderBy('name')
                .toArray()
                .then(rows => setAgeList(rows.map((option) => ({ value: option.name, label: option.name }))))
    })

    const save = async (e) => {
        const categoriesTmp = categories.map(c => ( {id: c.value, name: c.label} ))
        const agesTmp = ages.map(a => ( {id: a.value, name: a.label} ))

        db.preference
            .put({
                id: 1,
                execute_url: execute_url,
                execute_title: execute_title,
                starting_time: starting_time,
                end_time: end_time,
                ages: agesTmp,
                categories: categoriesTmp,
                //url_blocked: urlBlocked,
                //key_blocked: [],
            })
            .then(() => chrome.runtime.sendMessage("ReloadRules"))
            .catch((e) => { console.log(e) })

        e.preventDefault()
    }

    const form = () => {
        return (
            <form>
                <div>
                    <div key={id} className="container">
                        <div className="row">
                            <div className="col-4">
                                Opções
                                <div >
                                    <label className="form-check">
                                        Examinar URL
                                        <input className="form-check-input form-control" type="checkbox" onChange={e => setExecute_url(e.target.checked)} checked={execute_url} name="execute_url" />
                                    </label>
                                    <label className="form-check">
                                        <input className="form-check-input form-control" type="checkbox" onChange={e => setExecute_title(e.target.checked)} checked={execute_title} name="execute_title" />
                                        Examinar Título
                                    </label>
                                </div>
                            </div>
                            <div className="col-8">
                                Horários de Acesso
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label" htmlFor="starting_time">
                                            Inicia em
                                            <input className="form-control" type="time" onChange={e => setStarting_time(e.target.value)} value={starting_time} name="starting_time" />
                                        </label>

                                    </div>
                                    <div className="col">
                                        <label className="form-label" htmlFor="end_time">
                                            Termina em
                                            <input className="form-control" type="time" onChange={e => setEnd_time(e.target.value)} value={end_time} name="end_time" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        Seleção de Bloqueios
                        <div className="row">
                            <div className="col">
                                <label className="form-label row">
                                    Categorias: <Select isMulti value={categories} options={categoryList} onChange={(env) => handleCategory(env)} className="form-control" />
                                </label>
                                <label className="form-label row">
                                    Faixas Etárias: <Select isMulti value={ages} options={ageList} onChange={(env) => handleAge(env)} className="form-control" />
                                </label>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary me-2 mb-2" onClick={e => save(e)} >Salvar</button>
                        </div>
                    </div>
                </div>
            </form >
        )
    }

    const handleCategory = (data) => {
        setCategories(data)
    }

    const handleAge = (data) => {
        setAges(data)
    }

    return (
        <Main {...headerProps}>
            {form()}
        </Main>
    )
}