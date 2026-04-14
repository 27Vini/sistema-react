import type { Distribuidora } from "../../distribuidora/types/Distribuidora";
import { FormularioJogo } from "../components/FormularioJogo";
import type { NovoJogo, Jogo } from "../types/Jogo";

interface CadastraJogoProps {
	distribuidoras: Distribuidora[];
	jogoEmEdicao: Jogo | null;
	onCadastrarJogo: (jogo: NovoJogo) => void;
	onCancelarEdicao: () => void;
}

export default function CadastraJogo({
	distribuidoras,
	jogoEmEdicao,
	onCadastrarJogo,
	onCancelarEdicao,
}: CadastraJogoProps) {
	return (
		<>
			<h2>{jogoEmEdicao ? "Atualizar jogo" : "Cadastrar jogo"}</h2>
			<FormularioJogo
				distribuidoras={distribuidoras}
				jogoEmEdicao={jogoEmEdicao}
				onSubmit={onCadastrarJogo}
				onCancelarEdicao={onCancelarEdicao}
			/>
		</>
	);
}
