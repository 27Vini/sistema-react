import { FormularioUsuario } from "../components/FormularioUsuario";
import type { NovoUsuario, Usuario } from "../../../types/Usuario";

interface CadastraUsuarioProps {
	usuarioEmEdicao: Usuario | null;
	onCadastrarUsuario: (usuario: NovoUsuario) => void;
	onCancelarEdicao: () => void;
}

export default function CadastraUsuario({
	usuarioEmEdicao,
	onCadastrarUsuario,
	onCancelarEdicao,
}: CadastraUsuarioProps) {
	return (
		<>
			<h2>{usuarioEmEdicao ? "Atualizar usuario" : "Cadastrar usuario"}</h2>
			<FormularioUsuario
				usuarioEmEdicao={usuarioEmEdicao}
				onSubmit={onCadastrarUsuario}
				onCancelarEdicao={onCancelarEdicao}
			/>
		</>
	);
}
