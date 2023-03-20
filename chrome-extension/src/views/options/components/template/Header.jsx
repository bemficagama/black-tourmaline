import './Header.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header(props) {
    return (
        <header>
                <div className='main-shadow p-2 mt-1 mb-1'>
                    <h1 className="mt-2">
                        <FontAwesomeIcon icon={props.icon} /> {props.title}
                    </h1>
                </div>
            {/* <p className="lead text-muted">{props.subtitle}</p> */}
        </header>
    )
}