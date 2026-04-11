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
import type { Distribuidora } from "../types/Distribuidora";
import { CampoPesquisa } from "../../../components/CampoPesquisa";

interface ListaDistribuidorasProps {
	distribuidoras: Distribuidora[];
	onEditarDistribuidora: (distribuidora: Distribuidora) => void;
	onRemoverDistribuidora: (id: number) => void;
}

export function ListaDistribuidoras({
	distribuidoras,
	onEditarDistribuidora,
	onRemoverDistribuidora,
}: ListaDistribuidorasProps) {
	const [distribuidoraDetalhadaId, setDistribuidoraDetalhadaId] = useState<
		number | null
	>(null);
	const [filtro, setFiltro] = useState<string>("");

	const distribuidorasFiltradas = distribuidoras.filter((distribuidora) =>
		distribuidora.nome.toLowerCase().includes(filtro.toLowerCase()),
	);

	if (distribuidoras.length === 0) {
		return (
			<>
				<CampoPesquisa
					filtro={filtro}
					setFiltro={setFiltro}
					label="Pesquisa Nome"
				></CampoPesquisa>
				<Paper className={commonStyles.paperSection}>
					<Typography className={commonStyles.emptyMessage}>
						Cadastre a primeira distribuidora para depois vincular jogos a ela.
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
							<TableCell>Nome</TableCell>
							<TableCell>Pais</TableCell>
							<TableCell>Detalhes</TableCell>
							<TableCell>Atualizar</TableCell>
							<TableCell>Remover</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{distribuidorasFiltradas.map((distribuidora) => (
							<Fragment key={distribuidora.id}>
								<TableRow hover>
									<TableCell>{distribuidora.id}</TableCell>
									<TableCell>{distribuidora.nome}</TableCell>
									<TableCell>{distribuidora.pais}</TableCell>
									<TableCell>
										<Button
											size="small"
											variant="outlined"
											onClick={() =>
												setDistribuidoraDetalhadaId((currentId) =>
													currentId === distribuidora.id
														? null
														: distribuidora.id,
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
											onClick={() => onEditarDistribuidora(distribuidora)}
										>
											Atualizar
										</Button>
									</TableCell>
									<TableCell>
										<Button
											size="small"
											color="error"
											variant="contained"
											onClick={() => onRemoverDistribuidora(distribuidora.id)}
										>
											Remover
										</Button>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={6} className={commonStyles.collapseCell}>
										<Collapse
											in={distribuidoraDetalhadaId === distribuidora.id}
										>
											<Box className={commonStyles.detailBox}>
												<Typography>ID: {distribuidora.id}</Typography>
												<Typography>Nome: {distribuidora.nome}</Typography>
												<Typography>Pais: {distribuidora.pais}</Typography>
												<Typography>
													Ano de fundacao: {distribuidora.anoFundacao}
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
