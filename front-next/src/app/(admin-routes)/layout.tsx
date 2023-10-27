import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import MenuLateral from '@/components/template/MenuLateral'
import Cabecalho from '@/components/template/Cabecalho'
import Conteudo from '@/components/template/Conteudo'
import useAppData from '../data/hook/useAppData'

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
	const session = await getServerSession(nextAuthOptions)
	const { tema } = useAppData()

	if (!session) {
		redirect('/')
	}

	return (
		<>
		<div className={`${tema} flex h-screen w-screen`}>
			<MenuLateral />
			{children}
		</div>
		</>
	)
}