import { Route, Routes } from "react-router-dom";
import type { Distribuidora } from "../../types/Distribuidora";
import CadastraJogo from "./pages/CadastraJogo";
import ListarJogos from "./pages/ListarJogos";
import type { NovoJogo, Jogo } from "../../types/Jogo";

interface JogoRoutesProps {
	jogos: Jogo[];
	distribuidoras: Distribuidora[];
	jogoEmEdicao: Jogo | null;
	onCadastrarJogo: (jogo: NovoJogo) => void;
	onEditarJogo: (jogo: Jogo) => void;
	onRemoverJogo: (id: number) => void;
	onCancelarEdicaoJogo: () => void;
}

export default function RoutesJogo({
	jogos,
	distribuidoras,
	jogoEmEdicao,
	onCadastrarJogo,
	onEditarJogo,
	onRemoverJogo,
	onCancelarEdicaoJogo,
}: JogoRoutesProps) {
	return (
		<Routes>
			<Route
				path="/cadastrar"
				element={
					<CadastraJogo
						distribuidoras={distribuidoras}
						jogoEmEdicao={jogoEmEdicao}
						onCadastrarJogo={onCadastrarJogo}
						onCancelarEdicao={onCancelarEdicaoJogo}
					/>
				}
			/>
			<Route
				path="/listar"
				element={
					<ListarJogos
						jogos={jogos}
						distribuidoras={distribuidoras}
						onEditarJogo={onEditarJogo}
						onRemoverJogo={onRemoverJogo}
					/>
				}
			/>
		</Routes>
	);
}
