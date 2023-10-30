'use client'

import Titulo from './Titulo'
import BotaoAlternarTema from './BotaoAlternarTema'
import AvatarUsuario from './AvatarUsuario'
import { UseGlobalContext } from '@/app/Context/store'

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
    const { tema, alternarTema } = UseGlobalContext()

    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className={`flex flex-grow justify-end items-center`}>
                {<BotaoAlternarTema tema={tema!} alternarTema={alternarTema!} />}
                <AvatarUsuario className="ml-3" />
            </div>
        </div>
    )
}