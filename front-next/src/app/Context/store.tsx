'use client'

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type Tema = 'dark' | ''

interface AppContextProps {
    tema?: string
    titulo: string
    subtitulo: string
    alternarTema?: () => void
    setTitulo: Dispatch<SetStateAction<string>>
    setSubtitulo: Dispatch<SetStateAction<string>>
    username: string
    setUsername: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<AppContextProps>({
    tema: '',
    titulo: '',
    subtitulo: '',
    setTitulo: (): string => '',
    setSubtitulo: (): string => '',
    username: '',
    setUsername: (): string => ''

})

export const GlobalContextProvider = (props: any) => {
    const [tema, setTema] = useState('dark')
    const [titulo, setTitulo] = useState('Página Inicial')
    const [subtitulo, setSubtitulo] = useState('Seja Bem Vindo!')
    const [username, setUsername] = useState('')

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo as SetStateAction<string>)
    }, [])

    return (
        <GlobalContext.Provider value={{
            tema,
            titulo,
            subtitulo,
            alternarTema,
            setTitulo,
            setSubtitulo,
            username,
            setUsername
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const UseGlobalContext = () => useContext(GlobalContext)