import { TextField } from "@mui/material";

type CampoPesquisaProps = {
	label: string;
	filtro: string;
	setFiltro: (filtro: string) => void;
};

export function CampoPesquisa({
	label,
	filtro,
	setFiltro,
}: CampoPesquisaProps) {
	return (
		<TextField
			label={label}
			name="pesquisa"
			value={filtro}
			onChange={(e) => setFiltro(e.target.value)}
			fullWidth
		/>
	);
}
