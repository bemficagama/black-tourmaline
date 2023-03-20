import './Main.css'
import React from 'react'
import Header from './Header'

export default function Main(props) {
    return (
        <React.Fragment>
            {<Header {...props} />}
            <main className="container main-shadow p-2 overflow-auto" style={{height: '80%'}} >
                {props.children}
            </main>
        </React.Fragment>
    )
}