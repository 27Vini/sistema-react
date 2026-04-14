import { Jogo } from "../../jogo/types/Jogo";
import { Usuario } from "../../usuario/types/Usuario";
import { FormularioJogoJogado } from "../components/FormularioJogoJogado";
import { JogoJogado, JogoJogadoNovo } from "../types/JogosJogados";

interface CadastraJogoJogadoProps {
	jogos: Jogo[];
	usuarios: Usuario[];
	jogosJogados: JogoJogado[];
	jogoJogadoEmEdicao: JogoJogado | null;
	onCadastrarJogo: (jogoJogado: JogoJogadoNovo) => void;
	onCancelarEdicao: () => void;
}

export function CadastraJogoJogado({
	jogos,
	usuarios,
	jogosJogados,
	jogoJogadoEmEdicao,
	onCadastrarJogo,
	onCancelarEdicao,
}: CadastraJogoJogadoProps) {
	return (
		<>
			<h2>
				{jogoJogadoEmEdicao ? "Atualizar Jogo Jogado" : "Cadastrar Jogo Jogado"}
			</h2>
			<FormularioJogoJogado
				jogos={jogos}
				jogosJogados={jogosJogados}
				jogoJogadoEmEdicao={jogoJogadoEmEdicao}
				onCancelarEdicao={onCancelarEdicao}
				onSubmit={onCadastrarJogo}
				usuarios={usuarios}
			></FormularioJogoJogado>
		</>
	);
}
