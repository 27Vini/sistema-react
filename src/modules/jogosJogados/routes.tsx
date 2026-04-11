import { Route, Routes } from "react-router-dom";
import { Jogo } from "../jogo/types/Jogo";
import { Usuario } from "../usuario/types/Usuario";
import { JogoJogado, JogoJogadoNovo } from "./types/JogosJogados";
import { CadastraJogoJogado } from "./pages/CadastraJogoJogado";
import { ListarJogosJogados } from "./pages/ListarJogosJogados";

interface JogosJogadosRouteProps {
	usuarios: Usuario[];
	jogos: Jogo[];
	jogosJogados: JogoJogado[];
	jogoJogadoEmEdicao: JogoJogado | null;
	onCadastrarJogo: (novoJogoJogado: JogoJogadoNovo) => void;
	onEditarJogo: (jogoJogado: JogoJogado) => void;
	onRemoverJogo: (id: number) => void;
	onCancelarEdicaoJogo: () => void;
}

export default function RoutesJogoJogado({
	usuarios,
	jogos,
	jogosJogados,
	jogoJogadoEmEdicao,
	onCadastrarJogo,
	onEditarJogo,
	onRemoverJogo,
	onCancelarEdicaoJogo,
}: JogosJogadosRouteProps) {
	return (
		<Routes>
			<Route
				path="/cadastrar"
				element={
					<CadastraJogoJogado
						jogoJogadoEmEdicao={jogoJogadoEmEdicao}
						jogos={jogos}
						onCadastrarJogo={onCadastrarJogo}
						onCancelarEdicao={onCancelarEdicaoJogo}
						usuarios={usuarios}
					/>
				}
			></Route>
			<Route
				path="/listar"
				element={
					<ListarJogosJogados
						jogos={jogos}
						jogosJogados={jogosJogados}
						onEditarJogoJogado={onEditarJogo}
						onRemoverJogo={onRemoverJogo}
						usuarios={usuarios}
					></ListarJogosJogados>
				}
			></Route>
		</Routes>
	);
}
