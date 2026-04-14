import { FormularioAdministrador } from "../components/FormularioAdministrador";
import type { NovoAdministrador, Administrador } from "../../../types/Administrador";

interface CadastraAdministradorProps {
	administradorEmEdicao: Administrador | null;
	onCadastrarAdministrador: (administrador: NovoAdministrador) => void;
	onCancelarEdicao: () => void;
}

export default function CadastraAdministrador({
	administradorEmEdicao,
	onCadastrarAdministrador,
	onCancelarEdicao,
}: CadastraAdministradorProps) {
	return (
		<>
			<h2>
				{administradorEmEdicao
					? "Atualizar administrador"
					: "Cadastrar administrador"}
			</h2>
			<FormularioAdministrador
				administradorEmEdicao={administradorEmEdicao}
				onSubmit={onCadastrarAdministrador}
				onCancelarEdicao={onCancelarEdicao}
			/>
		</>
	);
}
