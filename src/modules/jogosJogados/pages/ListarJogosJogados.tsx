import { ListaJogosJogados } from "../components/ListaJogosJogados";
import { Jogo } from "../../jogo/types/Jogo";
import { Usuario } from "../../usuario/types/Usuario";
import { JogoJogado } from "../types/JogosJogados";

interface ListarJogosJogadosProps {
	jogosJogados: JogoJogado[];
	jogos: Jogo[];
	usuarios: Usuario[];
	onEditarJogoJogado: (jogoJogado: JogoJogado) => void;
	onRemoverJogo: (id: number) => void;
}

export function ListarJogosJogados({
	jogosJogados,
	jogos,
	usuarios,
	onEditarJogoJogado,
	onRemoverJogo,
}: ListarJogosJogadosProps) {
	return (
		<>
			<h2>Listar jogos jogados</h2>
			<ListaJogosJogados
				jogos={jogos}
				usuarios={usuarios}
				jogosJogados={jogosJogados}
				onEditarJogoJogado={onEditarJogoJogado}
				onRemoverJogoJogado={onRemoverJogo}
			/>
		</>
	);
}
