import { ListaAdministradores } from "../components/ListaAdministradores";
import type { Administrador } from "../../../types/Administrador";

interface ListarAdministradoresProps {
	administradores: Administrador[];
	onEditarAdministrador: (administrador: Administrador) => void;
	onRemoverAdministrador: (id: number) => void;
}

export default function ListarAdministradores({
	administradores,
	onEditarAdministrador,
	onRemoverAdministrador,
}: ListarAdministradoresProps) {
	return (
		<>
			<h2>Listar administradores</h2>
			<ListaAdministradores
				administradores={administradores}
				onEditarAdministrador={onEditarAdministrador}
				onRemoverAdministrador={onRemoverAdministrador}
			/>
		</>
	);
}
