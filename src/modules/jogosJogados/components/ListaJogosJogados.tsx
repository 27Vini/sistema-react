import { Fragment, useState } from "react";
import { Jogo } from "../../jogo/types/Jogo";
import { Usuario } from "../../usuario/types/Usuario";
import { JogoJogado } from "../types/JogosJogados";
import { CampoPesquisa } from "../../../components/CampoPesquisa";
import {
	Box,
	Button,
	Collapse,
	Paper,
	Rating,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import commonStyles from "../../../styles/MuiCommon.module.css";

interface ListaJogosJogadosProps {
	jogos: Jogo[];
	usuarios: Usuario[];
	jogosJogados: JogoJogado[];
	onEditarJogoJogado: (jogoJogado: JogoJogado) => void;
	onRemoverJogoJogado: (id: number) => void;
}

export function ListaJogosJogados({
	jogos,
	usuarios,
	jogosJogados,
	onEditarJogoJogado,
	onRemoverJogoJogado,
}: ListaJogosJogadosProps) {
	const [jogoJogadoDetalhadoId, setJogoJogadoDetalhadoId] = useState<
		number | null
	>(null);
	const [filtro, setFiltro] = useState<string>("");

	const resolveJogo = (jogoId: number) =>
		jogos.find((jogo) => jogo.id === jogoId)?.titulo || "Nao encontrado";

	const resolveUsuario = (usuarioId: number) =>
		usuarios.find((usuario) => usuario.id === usuarioId)?.nome ||
		"Nao encontrado";

	const jogosJogadosFiltrado = jogosJogados.filter(
		(jogoJogado) =>
			resolveJogo(jogoJogado.jogoId)
				.toLowerCase()
				.includes(filtro.toLowerCase()) ||
			resolveUsuario(jogoJogado.usuarioId)
				.toLowerCase()
				.includes(filtro.toLowerCase()),
	);

	const renderEstrelas = (estrela: number) => (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
			<Rating value={estrela} max={5} readOnly />
			<Typography variant="body2">{estrela}/5</Typography>
		</Box>
	);

	if (jogosJogados.length === 0) {
		return (
			<>
				<CampoPesquisa
					filtro={filtro}
					setFiltro={setFiltro}
					label="Pesquisa Usuario ou Jogo"
				></CampoPesquisa>
				<Paper className={commonStyles.paperSection}>
					<Typography className={commonStyles.emptyMessage}>
						Nenhum jogo jogado foi cadastrado ainda. Assim que voce salvar um,
						ele aparece aqui.
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
				label="Pesquisa Usuario ou Jogo"
			></CampoPesquisa>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Titulo</TableCell>
							<TableCell>Usuario</TableCell>
							<TableCell>Detalhes</TableCell>
							<TableCell>Atualizar</TableCell>
							<TableCell>Remover</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{jogosJogadosFiltrado.map((jogoJogado) => (
							<Fragment key={jogoJogado.id}>
								<TableRow hover>
									<TableCell>{jogoJogado.id}</TableCell>
									<TableCell>{resolveJogo(jogoJogado.jogoId)}</TableCell>
									<TableCell>{resolveUsuario(jogoJogado.usuarioId)}</TableCell>
									<TableCell>
										<Button
											size="small"
											variant="outlined"
											onClick={() =>
												setJogoJogadoDetalhadoId((currentId) =>
													currentId === jogoJogado.id ? null : jogoJogado.id,
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
											onClick={() => onEditarJogoJogado(jogoJogado)}
										>
											Atualizar
										</Button>
									</TableCell>
									<TableCell>
										<Button
											size="small"
											color="error"
											variant="contained"
											onClick={() => onRemoverJogoJogado(jogoJogado.id)}
										>
											Remover
										</Button>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={6} className={commonStyles.collapseCell}>
										<Collapse in={jogoJogadoDetalhadoId === jogoJogado.id}>
											<Box className={commonStyles.detailBox}>
												<Typography>ID: {jogoJogado.id}</Typography>
												<Typography>
													Titulo: {resolveJogo(jogoJogado.jogoId)}
												</Typography>
												<Typography>
													Usuario: {resolveUsuario(jogoJogado.usuarioId)}
												</Typography>
												<Typography>Status: {jogoJogado.status}</Typography>
												<Box sx={{ mt: 1 }}>
													<Typography>Estrelas:</Typography>
													{renderEstrelas(jogoJogado.estrela)}
												</Box>
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
