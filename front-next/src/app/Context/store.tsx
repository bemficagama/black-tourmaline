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
}

const GlobalContext = createContext<AppContextProps>({
    tema: '',
    titulo: '',
    subtitulo: '',
    setTitulo: (): string => '',
    setSubtitulo: (): string => ''
})

export const GlobalContextProvider = (props: any) => {
    const [tema, setTema] = useState(props.tema)
    const [titulo, setTitulo] = useState('Página Inicial')
    const [subtitulo, setSubtitulo] = useState('Seja Bem Vindo!')

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
            setSubtitulo
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const UseGlobalContext = () => useContext(GlobalContext)