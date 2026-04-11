import { useState } from "react";
import { ListaUsuarios } from "../components/ListaUsuarios";
import type { Usuario } from "../types/Usuario";

interface ListarUsuariosProps {
	usuarios: Usuario[];
	onEditarUsuario: (usuario: Usuario) => void;
	onRemoverUsuario: (id: number) => void;
}

export default function ListarUsuarios({
	usuarios,
	onEditarUsuario,
	onRemoverUsuario,
}: ListarUsuariosProps) {
	return (
		<>
			<h2>Listar usuarios</h2>
			<ListaUsuarios
				usuarios={usuarios}
				onEditarUsuario={onEditarUsuario}
				onRemoverUsuario={onRemoverUsuario}
			/>
		</>
	);
}
