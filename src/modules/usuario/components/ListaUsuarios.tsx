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
import type { Usuario } from "../types/Usuario";
import { CampoPesquisa } from "../../../components/CampoPesquisa";

interface ListaUsuariosProps {
	usuarios: Usuario[];
	onEditarUsuario: (usuario: Usuario) => void;
	onRemoverUsuario: (id: number) => void;
}

export function ListaUsuarios({
	usuarios,
	onEditarUsuario,
	onRemoverUsuario,
}: ListaUsuariosProps) {
	const [filtro, setFiltro] = useState<string>("");
	const [usuarioDetalhadoId, setUsuarioDetalhadoId] = useState<number | null>(
		null,
	);

	const usuariosFiltrados = usuarios.filter((usuario) => {
		return usuario.nome.toLowerCase().includes(filtro.toLowerCase());
	});

	if (usuarios.length === 0) {
		return (
			<>
				<CampoPesquisa
					label="Pesquisa Nome"
					filtro={filtro}
					setFiltro={setFiltro}
				></CampoPesquisa>
				<Paper className={commonStyles.paperSection}>
					<Typography className={commonStyles.emptyMessage}>
						Nenhum usuario cadastrado por enquanto. Os novos perfis aparecem
						nesta lista.
					</Typography>
				</Paper>
			</>
		);
	}

	return (
		<>
			<CampoPesquisa
				label="Pesquisa Nome"
				filtro={filtro}
				setFiltro={setFiltro}
			></CampoPesquisa>
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
						{usuariosFiltrados.map((usuario) => (
							<Fragment key={usuario.id}>
								<TableRow hover>
									<TableCell>{usuario.id}</TableCell>
									<TableCell>{usuario.nome}</TableCell>
									<TableCell>{usuario.email}</TableCell>
									<TableCell>
										<Button
											size="small"
											variant="outlined"
											onClick={() =>
												setUsuarioDetalhadoId((currentId) =>
													currentId === usuario.id ? null : usuario.id,
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
											onClick={() => onEditarUsuario(usuario)}
										>
											Atualizar
										</Button>
									</TableCell>
									<TableCell>
										<Button
											size="small"
											color="error"
											variant="contained"
											onClick={() => onRemoverUsuario(usuario.id)}
										>
											Remover
										</Button>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={6} className={commonStyles.collapseCell}>
										<Collapse in={usuarioDetalhadoId === usuario.id}>
											<Box className={commonStyles.detailBox}>
												<Typography>ID: {usuario.id}</Typography>
												<Typography>Nome: {usuario.nome}</Typography>
												<Typography>Email: {usuario.email}</Typography>
												<Typography>Senha: {usuario.senha}</Typography>
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
