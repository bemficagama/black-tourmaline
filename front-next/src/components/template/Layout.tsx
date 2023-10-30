'use client'

import MenuLateral from './MenuLateral'
import Cabecalho from './Cabecalho'
import Conteudo from './Conteudo'
import { UseGlobalContext } from '@/app/Context/store'
import { ReactNode, useEffect } from 'react'

interface LayoutProps {
    children: ReactNode
}

export default function Layout(props: LayoutProps) {
    const { tema, titulo, subtitulo } = UseGlobalContext()

    return (
        <div className={`${tema} flex h-screen w-screen`}>
            <MenuLateral />
            <div className={`
                flex flex-col w-full p-7 
                bg-gray-300 dark:bg-gray-800
            `}>
                <Cabecalho titulo={titulo} subtitulo={subtitulo} />
                <Conteudo>
                    {props.children}
                </Conteudo>
            </div>
        </div>
    )
}