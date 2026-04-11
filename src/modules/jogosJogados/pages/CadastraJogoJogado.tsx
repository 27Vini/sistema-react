import { Jogo } from "../../jogo/types/Jogo";
import { Usuario } from "../../usuario/types/Usuario";
import { JogoJogado, JogoJogadoNovo } from "../types/JogosJogados";

interface CadastraJogoJogadoProps {
	jogos: Jogo[];
	usuarios: Usuario[];
	jogoJogadoEmEdicao: JogoJogado | null;
	onCadastrarJogo: (jogoJogado: JogoJogadoNovo) => void;
	onCancelarEdicao: () => void;
}

export function CadastraJogoJogado({
	jogos,
	usuarios,
	jogoJogadoEmEdicao,
	onCadastrarJogo,
	onCancelarEdicao,
}: CadastraJogoJogadoProps) {
	return <></>;
}
