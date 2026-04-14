import { Route, Routes } from "react-router-dom";
import CadastraAdministrador from "./pages/CadastraAdministrador";
import ListarAdministradores from "./pages/ListarAdministradores";
import type { NovoAdministrador, Administrador } from "../../types/Administrador";

interface AdministradorRoutesProps {
	administradores: Administrador[];
	administradorEmEdicao: Administrador | null;
	onCadastrarAdministrador: (administrador: NovoAdministrador) => void;
	onEditarAdministrador: (administrador: Administrador) => void;
	onRemoverAdministrador: (id: number) => void;
	onCancelarEdicaoAdministrador: () => void;
}

export default function RoutesAdministrador({
	administradores,
	administradorEmEdicao,
	onCadastrarAdministrador,
	onEditarAdministrador,
	onRemoverAdministrador,
	onCancelarEdicaoAdministrador,
}: AdministradorRoutesProps) {
	return (
		<Routes>
			<Route
				path="/cadastrar"
				element={
					<CadastraAdministrador
						administradorEmEdicao={administradorEmEdicao}
						onCadastrarAdministrador={onCadastrarAdministrador}
						onCancelarEdicao={onCancelarEdicaoAdministrador}
					/>
				}
			/>
			<Route
				path="/listar"
				element={
					<ListarAdministradores
						administradores={administradores}
						onEditarAdministrador={onEditarAdministrador}
						onRemoverAdministrador={onRemoverAdministrador}
					/>
				}
			/>
		</Routes>
	);
}
