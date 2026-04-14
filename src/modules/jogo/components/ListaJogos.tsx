import { Fragment, useState } from "react";
import {
	Box,
	Button,
	Collapse,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import commonStyles from "../../../styles/MuiCommon.module.css";
import type { Distribuidora } from "../../../types/Distribuidora";
import type { Jogo } from "../../../types/Jogo";
import { CampoPesquisa } from "../../../components/CampoPesquisa";

interface ListaJogosProps {
	jogos: Jogo[];
	distribuidoras: Distribuidora[];
	onEditarJogo: (jogo: Jogo) => void;
	onRemoverJogo: (id: number) => void;
}

export function ListaJogos({
	jogos,
	distribuidoras,
	onEditarJogo,
	onRemoverJogo,
}: ListaJogosProps) {
	const [jogoDetalhadoId, setJogoDetalhadoId] = useState<number | null>(null);
	const [filtro, setFiltro] = useState<string>("");

	const resolveDistribuidora = (distribuidoraId: number) =>
		distribuidoras.find((item) => item.id === distribuidoraId)?.nome ??
		"Nao encontrada";

	const jogosFiltrados = jogos.filter((jogo) =>
		jogo.titulo.toLowerCase().includes(filtro.toLowerCase()),
	);

	if (jogos.length === 0) {
		return (
			<>
				<CampoPesquisa
					filtro={filtro}
					setFiltro={setFiltro}
					label="Pesquisa Nome"
				></CampoPesquisa>
				<Paper className={commonStyles.paperSection}>
					<Typography className={commonStyles.emptyMessage}>
						Nenhum jogo foi cadastrado ainda. Assim que voce salvar um jogo, ele
						aparece aqui.
					</Typography>
				</Paper>
			</>
		);
	}

	return (
		<>
			<CampoPesquisa
				filtro={filtro}
				setFiltro={setFiltro}
				label="Pesquisa Nome"
			></CampoPesquisa>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Titulo</TableCell>
							<TableCell>Genero</TableCell>
							<TableCell>Detalhes</TableCell>
							<TableCell>Atualizar</TableCell>
							<TableCell>Remover</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{jogosFiltrados.map((jogo) => (
							<Fragment key={jogo.id}>
								<TableRow hover>
									<TableCell>{jogo.id}</TableCell>
									<TableCell>{jogo.titulo}</TableCell>
									<TableCell>{jogo.genero}</TableCell>
									<TableCell>
										<Button
											size="small"
											variant="outlined"
											onClick={() =>
												setJogoDetalhadoId((currentId) =>
													currentId === jogo.id ? null : jogo.id,
												)
											}
										>
											Detalhes
										</Button>
									</TableCell>
									<TableCell>
										<Button
											size="small"
											variant="contained"
											onClick={() => onEditarJogo(jogo)}
										>
											Atualizar
										</Button>
									</TableCell>
									<TableCell>
										<Button
											size="small"
											color="error"
											variant="contained"
											onClick={() => onRemoverJogo(jogo.id)}
										>
											Remover
										</Button>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={6} className={commonStyles.collapseCell}>
										<Collapse in={jogoDetalhadoId === jogo.id}>
											<Box className={commonStyles.detailBox}>
												<Typography>ID: {jogo.id}</Typography>
												<Typography>Titulo: {jogo.titulo}</Typography>
												<Typography>Genero: {jogo.genero}</Typography>
												<Typography>Plataforma: {jogo.plataforma}</Typography>
												<Typography>
													Ano de lancamento: {jogo.anoLancamento}
												</Typography>
												<Typography>
													Distribuidora:{" "}
													{resolveDistribuidora(jogo.distribuidoraId)}
												</Typography>
											</Box>
										</Collapse>
									</TableCell>
								</TableRow>
							</Fragment>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
