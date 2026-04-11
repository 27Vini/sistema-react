import { Fragment, useEffect, useState } from "react";
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
	TextField,
	Typography,
} from "@mui/material";
import commonStyles from "../../../styles/MuiCommon.module.css";
import type { Administrador } from "../types/Administrador";
import { CampoPesquisa } from "../../../components/CampoPesquisa";

interface ListaAdministradoresProps {
	administradores: Administrador[];
	onEditarAdministrador: (administrador: Administrador) => void;
	onRemoverAdministrador: (id: number) => void;
}

export function ListaAdministradores({
	administradores,
	onEditarAdministrador,
	onRemoverAdministrador,
}: ListaAdministradoresProps) {
	const [administradorDetalhadoId, setAdministradorDetalhadoId] = useState<
		number | null
	>(null);
	const [filtro, setFiltro] = useState<string>("");

	const administradoresFiltrados = administradores.filter((administrador) =>
		administrador.nome.toLowerCase().includes(filtro.toLowerCase()),
	);

	if (administradores.length === 0) {
		return (
			<>
				<CampoPesquisa
					label="Pesquisa Nome"
					filtro={filtro}
					setFiltro={setFiltro}
				></CampoPesquisa>
				<Paper className={commonStyles.paperSection}>
					<Typography className={commonStyles.emptyMessage}>
						Nenhum administrador foi cadastrado ainda. Os registros vao aparecer
						aqui.
					</Typography>
				</Paper>
			</>
		);
	}

	return (
		<>
			<TextField
				label="Pesquisa Nome"
				name="pesquisa"
				value={filtro}
				onChange={(e) => setFiltro(e.target.value)}
				fullWidth
			/>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Nome</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Detalhes</TableCell>
							<TableCell>Atualizar</TableCell>
							<TableCell>Remover</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{administradoresFiltrados.map((administrador) => (
							<Fragment key={administrador.id}>
								<TableRow hover>
									<TableCell>{administrador.id}</TableCell>
									<TableCell>{administrador.nome}</TableCell>
									<TableCell>{administrador.email}</TableCell>
									<TableCell>
										<Button
											size="small"
											variant="outlined"
											onClick={() =>
												setAdministradorDetalhadoId((currentId) =>
													currentId === administrador.id
														? null
														: administrador.id,
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
											onClick={() => onEditarAdministrador(administrador)}
										>
											Atualizar
										</Button>
									</TableCell>
									<TableCell>
										<Button
											size="small"
											color="error"
											variant="contained"
											onClick={() => onRemoverAdministrador(administrador.id)}
										>
											Remover
										</Button>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={6} className={commonStyles.collapseCell}>
										<Collapse
											in={administradorDetalhadoId === administrador.id}
										>
											<Box className={commonStyles.detailBox}>
												<Typography>ID: {administrador.id}</Typography>
												<Typography>Nome: {administrador.nome}</Typography>
												<Typography>Email: {administrador.email}</Typography>
												<Typography>Senha: {administrador.senha}</Typography>
												<Typography>Setor: {administrador.setor}</Typography>
												<Typography>
													Codigo de acesso: {administrador.codigoAcesso}
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
