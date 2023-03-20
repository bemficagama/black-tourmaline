import React, { useState, useEffect } from "react";
import { db } from '../../../models/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { faPencil, faTrash, faTags } from '@fortawesome/free-solid-svg-icons'
import Main from './template/Main'
import FooterPagination from "./template/FooterPagenation";

const PAGE_LIMIT = 5

function makePageCount(regCount = 0) {
    return Math.ceil(regCount / PAGE_LIMIT)
}

export default function UrlComponent(props) {

    const [id, setId] = useState(0)
    const [url, setUrl] = useState("")
    const [list, setList] = useState([])
    const [ages, setAges] = useState([])
    const [categories, setCategories] = useState([])
    const [ageList, setAgeList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [view, setView] = useState(true)
    const [pageCount, setPageCount] = useState(1)
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(0)
    const [regCount, setRegCount] = useState(0)



    const headerProps = {
        icon: faTags,
        title: 'URLs',
        subtitle: 'URLs para filtrar os sites!',
        onNewButtonClick: (e) => load(e, { url: "", categories: [], ages: [] }),
    }

    useEffect(() => {
        db.url
            .toArray()
            .then(rows => {
                const length = rows.length
                setPageCount(makePageCount(length))
                setRegCount(length)
                const sort = rows.sort((a, b) => a.url.localeCompare(b.url))
                const paginate = sort.slice(offset, offset + 5)
                setList(paginate)
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

    const clear = (e) => {
        setId(0)
        setUrl("")
        setView(true)
        e.preventDefault()
    }

    const save = (e) => {
        const categoriesTmp = categories.map(c => ({ id: c.value, name: c.label }))
        const agesTmp = ages.map(a => ({ id: a.value, name: a.label }))
        if (id > 0) {
            db.url.put({ id: id, url: url, categories: categoriesTmp, ages: agesTmp })
                .then((data) => console.log(data))
        } else {
            db.url.add({ url: url, categories: categoriesTmp, ages: agesTmp })
                .then((data) => {
                    setPageCount(makePageCount(regCount + 1))
                    setRegCount(regCount + 1)
                })
        }
        setUrl("")
        setView(true)
        e.preventDefault()
    }

    const form = () => {
        return (
            <form className="d-flex flex-column flex-fill m-2">
                <div className="d-flex flex-column justify-content-between flex-fill">
                    <div className="d-flex flex-column p-2 ">
                        <label className="form-label">
                            URL
                            <input type="text" className="form-control"
                                name="url"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                placeholder="Digite a Chave..." />
                        </label>
                        <label className="form-label">
                            Categorias
                            <Select isMulti value={categories} options={categoryList} onChange={(env) => handleCategory(env)} className="form-control" />
                        </label>
                        <label className="form-label">
                            Faixas Etárias
                            <Select isMulti value={ages} options={ageList} onChange={(env) => handleAge(env)} className="form-control" />
                        </label>
                    </div>
                    <div className="p-4">
                        <hr />
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary me-2"
                                onClick={(e) => save(e)}>
                                Salvar
                            </button>

                            <button className="btn btn-secondary"
                                onClick={(e) => clear(e)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    } //value={listCategory}

    const load = (e, url) => {
        const categoriesTmp = url.categories.map((c) => ({ value: c.id, label: c.name }))
        const agesTmp = url.ages.map((a) => ({ value: a.id, label: a.name }))
        setId(url.id)
        setUrl(url.url)
        setCategories(categoriesTmp)
        setAges(agesTmp)
        setView(false)
        e.preventDefault()
    }

    const remove = (e, url) => {
        if (url.id > 0) {
            const id = Number(url.id)
            db.url.delete(id)
                .then((data) => setView(true))
        }
        e.preventDefault()
    }


    const table = () => {
        return (
            <div className="container h-100">
                <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                        <table className="table" >
                            <thead>
                                <tr>
                                    <th style={{ width: "15%" }}>#</th>
                                    <th>Chave</th>
                                    {/* <th>Descrição</th> */}
                                    <th style={{ width: "18%" }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows()}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <FooterPagination
                            onNewButtonClick={(e) => load(e, { id: 0, url: "", ages: [], categories: [] })}
                            handlePageClick={onPageChanged}
                            pageCount={pageCount}//totalRecords}
                            currentPage={Number(page)}
                        />
                    </div>
                </div>
            </div >
        )
    }

    const rows = () => {
        return list.map((url, index) => {
            return (
                <tr key={url.id}>
                    <td>{index}</td>
                    <td>{url.url}</td>
                    <td>
                        <button className="btn btn-sm btn-warning"
                            onClick={(e) => load(e, url)}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button className="btn btn-sm btn-danger ms-2"
                            onClick={(e) => remove(e, url)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    const onPageChanged = (data) => {
        const selected = data.selected
        setOffset(Math.ceil(selected * PAGE_LIMIT))
        setPage(selected)
        setView(true)
    }

    const handleCategory = (data) => {
        setCategories(data)
    }

    const handleAge = (data) => {
        setAges(data)
    }

    return (
        <Main {...headerProps}>
            {view ? table() : form()}
        </Main>
    )
}