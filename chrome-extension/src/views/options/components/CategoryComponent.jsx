import React, { useEffect, useState } from "react";
import { db } from '../../../models/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faObjectGroup } from '@fortawesome/free-solid-svg-icons'
import Main from './template/Main'
import FooterPagination from "./template/FooterPagenation";

const PAGE_LIMIT = 5

function makePageCount(regCount = 0) {
    return Math.ceil(regCount / PAGE_LIMIT)
}

export default function CategoryComponent(props) {

    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [list, setList] = useState([])
    const [view, setView] = useState(true)
    const [pageCount, setPageCount] = useState(1)
    const [offset, setOffset] = useState(0)
    const [page, setPage] = useState(0)
    const [regCount, setRegCount] = useState(0)

    const headerProps = {
        icon: faObjectGroup,
        title: 'Categorias',
        subtitle: 'Categorias para classificar as Chaves e URLs!'
    }

    useEffect(() => {
        db.category
            .toArray()
            .then(rows => {
                const length = rows.length
                setPageCount(makePageCount(length))
                setRegCount(length)
                const sort = rows.sort((a, b) => a.name.localeCompare(b.name))
                const paginate = sort.slice(offset, offset+5)
                setList(paginate)
            })
    })

    const clear = (env) => {
        setId(0)
        setName("")
        setDescription("")
        setView(true)
        env.preventDefault()
    }

    const save = (e) => {
        if (id > 0) {
            db.category.put({ id: id, name: name, description: description })
                .then((data) => console.log(data))
        } else {
            db.category.add({ name: name, description: description })
                .then(row => {
                    setPageCount(makePageCount(regCount + 1))
                    setRegCount(regCount + 1)
                })
        }
        setId(0)
        setName("")
        setView(true)
        e.preventDefault()
    }

    const form = () => {
        return (
            <form className="container m-2">
                <div className="d-flex flex-column justify-content-between flex-fill">
                    <div className="d-flex flex-column p-2 ">
                        <label className="form-label">
                            Nome
                            <input type="text" className="form-control"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Digite o Nome..." />
                        </label>
                        <label className="form-label">
                            Descrição
                            <textarea className="form-control"
                                rows={3}
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Digite a descrição..." />
                        </label>
                    </div>
                    <div className="p-4">
                        <hr />
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary me-2"
                                onClick={(e) => save(e)}>
                                Salvar
                            </button>

                            <button className="btn btn-secondary ml-2"
                                onClick={(e) => clear(e)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </form >
        )
    }

    const load = (e, category) => {
        setId(category.id)
        setName(category.name)
        setDescription(category.description)
        setView(false)
        e.preventDefault()
    }

    const remove = (e, category) => {
        db.category.delete(category.id)
            .then((data) => setView(true))
        e.preventDefault()
    }


    const table = () => {
        return (
            <div className="container h-100">
                <div className="d-flex flex-column justify-content-between h-100">
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>#</th>
                                    <th>Nome</th>
                                    <th style={{ width: '18%' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows()}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-auto ms-2">
                        <FooterPagination
                            onNewButtonClick={(e) => load(e, { id: 0, name: "", description: "" })}
                            handlePageClick={onPageChanged}
                            pageCount={pageCount}//totalRecords}
                            currentPage={Number(page)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const rows = () => {
        return list.map((category, index) => {
            return (
                <tr key={category.id}>
                    <td >{index}</td>
                    <td >{category.name}</td>
                    {/* <td>{category.description}</td> */}
                    <td >
                        <button className="btn btn-sm btn-warning"
                            onClick={(e) => load(e, category)}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button className="btn btn-sm btn-danger ms-2"
                            onClick={(e) => remove(e, category)}>
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

    return (
        <Main {...headerProps}>
            {view ? table() : form()}
        </Main>
    )

}