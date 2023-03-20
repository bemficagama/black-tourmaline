import React, { Component } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faGears, faShieldAlt, faObjectGroup, faTags, faLink } from '@fortawesome/free-solid-svg-icons'
import DashboardComponent from '../DashboardComponent'
import PreferenceComponent from '../PreferenceComponent'
import CategoryComponent from '../CategoryComponent'
import SecurityComponent from '../SecurityComponent'
import KeyComponent from '../KeyComponent'
import UrlComponent from '../UrlComponent'

class Nav extends Component {

    render() {
        let activeClassName = "nav-link active";
        return (
            <div className="container-lg" >
                <div className='row' style={{ height: '480px' }}>
                    <div className="col-3 p-3 bg-light" >
                        <h4>Opções</h4>
                        <hr />
                        <ul className="nav flex-column nav-pills">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) =>
                                    isActive ? activeClassName : "nav-link link-dark"
                                } aria-current="page">
                                    <FontAwesomeIcon icon={faGauge} /> Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/preferences" className={({ isActive }) =>
                                    isActive ? activeClassName : "nav-link link-dark"
                                }>
                                    <FontAwesomeIcon icon={faGears} /> Preferencias
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/security" className={({ isActive }) =>
                                    isActive ? activeClassName : "nav-link link-dark"
                                }>
                                    <FontAwesomeIcon icon={faShieldAlt} /> Segurança
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/categories" className={({ isActive }) =>
                                    isActive ? activeClassName : "nav-link link-dark"
                                }>
                                    <FontAwesomeIcon icon={faObjectGroup} /> Categorias
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/keys" className={({ isActive }) =>
                                    isActive ? activeClassName : "nav-link link-dark"
                                }>
                                    <FontAwesomeIcon icon={faTags} /> Chaves
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/urls" className={({ isActive }) =>
                                    isActive ? activeClassName : "nav-link link-dark"
                                }>
                                    <FontAwesomeIcon icon={faLink} /> URLs
                                </NavLink>
                            </li>
                        </ul>
                        <hr />
                    </div>

                    <div className="col-9 bg-light" >
                        <Routes>
                            <Route path="/" element={<DashboardComponent />} />
                            <Route path="/preferences" element={<PreferenceComponent />} />
                            <Route path="/security" element={<SecurityComponent />} />
                            <Route path="/categories" element={<CategoryComponent />} />
                            <Route path="/keys" element={<KeyComponent />} />
                            <Route path="/urls" element={<UrlComponent />} />
                        </Routes>
                    </div>
                </div>
            </div>

        )
    }
}

export { Nav }