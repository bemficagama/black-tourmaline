'use client'

import { UseGlobalContext } from '@/app/Context/store'
import Link from 'next/link'
import Image from 'next/image'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { username } = UseGlobalContext()
    //<div>{username}</div>
    return (
        <Link href="/perfil">
            <Image
                src={'/images/avatar.svg'}
                alt="Avatar do Usuário"
                className={`
                    h-10 w-10 rounded-full cursor-pointer
                    ${props.className}
                `} width={10} height={10}
            />
        </Link>
    )
}