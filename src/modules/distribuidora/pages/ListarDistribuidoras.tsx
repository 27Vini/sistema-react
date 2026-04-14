import { ListaDistribuidoras } from "../components/ListaDistribuidoras";
import type { Distribuidora } from "../../../types/Distribuidora";

interface ListarDistribuidorasProps {
	distribuidoras: Distribuidora[];
	onEditarDistribuidora: (distribuidora: Distribuidora) => void;
	onRemoverDistribuidora: (id: number) => void;
}

export default function ListarDistribuidoras({
	distribuidoras,
	onEditarDistribuidora,
	onRemoverDistribuidora,
}: ListarDistribuidorasProps) {
	return (
		<>
			<h2>Listar distribuidoras</h2>
			<ListaDistribuidoras
				distribuidoras={distribuidoras}
				onEditarDistribuidora={onEditarDistribuidora}
				onRemoverDistribuidora={onRemoverDistribuidora}
			/>
		</>
	);
}
