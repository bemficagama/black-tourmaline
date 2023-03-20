import React from "react";
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export default function AnaliticComponent(props){
        return (
            <div className="card shadow" >
                <div className="card-body">
                    <h5 className="card-title">
                        <FontAwesomeIcon icon={props.icon} /> {props.title}
                    </h5>
                    <div className="text-center">
                        <NavLink to={props.to}>
                            <h1>{props.counter}</h1>
                        </NavLink>
                    </div>
                </div>
            </div >
        )
}