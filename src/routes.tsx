import { useState } from "react";
import { Alert, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import commonStyles from "./styles/MuiCommon.module.css";
import RoutesAdministrador from "./modules/administrador/routes";
import type {
	NovoAdministrador,
	Administrador,
} from "./types/Administrador";
import RoutesDistribuidora from "./modules/distribuidora/routes";
import type {
	NovoDistribuidora,
	Distribuidora,
} from "./types/Distribuidora";
import RoutesJogo from "./modules/jogo/routes";
import type { NovoJogo, Jogo } from "./types/Jogo";
import RoutesUsuario from "./modules/usuario/routes";
import type { NovoUsuario, Usuario } from "./types/Usuario";
import { createId } from "./utils/createId";
import { administradoresMock } from "./utils/administradoresMock";
import { usuariosMock } from "./utils/usuariosMock";
import { distribuidorasMock } from "./utils/distribuidorasMock";
import { jogosMockados } from "./utils/jogosMock";
import RoutesJogoJogado from "./modules/jogosJogados/routes";
import {
	JogoJogado,
	JogoJogadoNovo,
} from "./modules/jogosJogados/types/JogosJogados";
import { jogosJogadosMock } from "./utils/jogosJogadosMock";

interface FeedbackState {
	open: boolean;
	message: string;
	severity: "success" | "info" | "warning";
}

function Home() {
	return (
		<Paper className={commonStyles.paperSection}>
			<Stack spacing={1}>
				<Typography variant="h4">Bem-vindo</Typography>
				<Typography color="text.secondary">
					Use o menu lateral para cadastrar, listar, atualizar e remover os
					dados do sistema.
				</Typography>
			</Stack>
		</Paper>
	);
}

export function AppRoutes() {
	const navigate = useNavigate();
	const [feedback, setFeedback] = useState<FeedbackState>({
		open: false,
		message: "",
		severity: "success",
	});
	const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosMock);
	const [usuarioEmEdicao, setUsuarioEmEdicao] = useState<Usuario | null>(null);
	const [administradores, setAdministradores] =
		useState<Administrador[]>(administradoresMock);
	const [administradorEmEdicao, setAdministradorEmEdicao] =
		useState<Administrador | null>(null);
	const [distribuidoras, setDistribuidoras] =
		useState<Distribuidora[]>(distribuidorasMock);
	const [distribuidoraEmEdicao, setDistribuidoraEmEdicao] =
		useState<Distribuidora | null>(null);
	const [jogos, setJogos] = useState<Jogo[]>(jogosMockados);
	const [jogoEmEdicao, setJogoEmEdicao] = useState<Jogo | null>(null);
	const [jogosJogados, setJogosJogados] =
		useState<JogoJogado[]>(jogosJogadosMock);
	const [jogoJogadoEmEdicao, setJogoJogadoEmEdicao] =
		useState<JogoJogado | null>(null);

	const abrirFeedback = (
		message: string,
		severity: "success" | "info" | "warning" = "success",
	) => {
		setFeedback({
			open: true,
			message,
			severity,
		});
	};

	const cadastrarUsuario = (novoUsuario: NovoUsuario) => {
		if (usuarioEmEdicao) {
			setUsuarios((currentUsers) =>
				currentUsers.map((usuario) =>
					usuario.id === usuarioEmEdicao.id
						? { id: usuario.id, ...novoUsuario }
						: usuario,
				),
			);
			setUsuarioEmEdicao(null);
			abrirFeedback("Usuario atualizado com sucesso.", "info");
			return;
		}

		setUsuarios((currentUsers) => [
			...currentUsers,
			{
				id: createId(),
				...novoUsuario,
			},
		]);
		abrirFeedback("Usuario cadastrado com sucesso.");
	};

	const editarUsuario = (usuario: Usuario) => {
		setUsuarioEmEdicao(usuario);
		navigate("/usuarios/cadastrar");
	};

	const removerUsuario = (id: number) => {
		setUsuarios((currentUsers) =>
			currentUsers.filter((usuario) => usuario.id !== id),
		);
		if (usuarioEmEdicao?.id === id) {
			setUsuarioEmEdicao(null);
		}
		abrirFeedback("Usuario removido com sucesso.", "warning");
	};

	const cadastrarAdministrador = (novoAdministrador: NovoAdministrador) => {
		if (administradorEmEdicao) {
			setAdministradores((currentAdmins) =>
				currentAdmins.map((administrador) =>
					administrador.id === administradorEmEdicao.id
						? { id: administrador.id, ...novoAdministrador }
						: administrador,
				),
			);
			setAdministradorEmEdicao(null);
			abrirFeedback("Administrador atualizado com sucesso.", "info");
			return;
		}

		setAdministradores((currentAdmins) => [
			...currentAdmins,
			{
				id: createId(),
				...novoAdministrador,
			},
		]);
		abrirFeedback("Administrador cadastrado com sucesso.");
	};

	const editarAdministrador = (administrador: Administrador) => {
		setAdministradorEmEdicao(administrador);
		navigate("/administradores/cadastrar");
	};

	const removerAdministrador = (id: number) => {
		setAdministradores((currentAdmins) =>
			currentAdmins.filter((administrador) => administrador.id !== id),
		);
		if (administradorEmEdicao?.id === id) {
			setAdministradorEmEdicao(null);
		}
		abrirFeedback("Administrador removido com sucesso.", "warning");
	};

	const cadastrarDistribuidora = (novaDistribuidora: NovoDistribuidora) => {
		if (distribuidoraEmEdicao) {
			setDistribuidoras((currentPublishers) =>
				currentPublishers.map((distribuidora) =>
					distribuidora.id === distribuidoraEmEdicao.id
						? { id: distribuidora.id, ...novaDistribuidora }
						: distribuidora,
				),
			);
			setDistribuidoraEmEdicao(null);
			abrirFeedback("Distribuidora atualizada com sucesso.", "info");
			return;
		}

		setDistribuidoras((currentPublishers) => [
			...currentPublishers,
			{
				id: createId(),
				...novaDistribuidora,
			},
		]);
		abrirFeedback("Distribuidora cadastrada com sucesso.");
	};

	const editarDistribuidora = (distribuidora: Distribuidora) => {
		setDistribuidoraEmEdicao(distribuidora);
		navigate("/distribuidoras/cadastrar");
	};

	const removerDistribuidora = (id: number) => {
		setDistribuidoras((currentPublishers) =>
			currentPublishers.filter((distribuidora) => distribuidora.id !== id),
		);
		if (distribuidoraEmEdicao?.id === id) {
			setDistribuidoraEmEdicao(null);
		}
		abrirFeedback("Distribuidora removida com sucesso.", "warning");
	};

	const cadastrarJogo = (novoJogo: NovoJogo) => {
		if (jogoEmEdicao) {
			setJogos((currentGames) =>
				currentGames.map((jogo) =>
					jogo.id === jogoEmEdicao.id ? { id: jogo.id, ...novoJogo } : jogo,
				),
			);
			setJogoEmEdicao(null);
			abrirFeedback("Jogo atualizado com sucesso.", "info");
			return;
		}

		setJogos((currentGames) => [
			...currentGames,
			{
				id: createId(),
				...novoJogo,
			},
		]);
		abrirFeedback("Jogo cadastrado com sucesso.");
	};

	const editarJogo = (jogo: Jogo) => {
		setJogoEmEdicao(jogo);
		navigate("/jogos/cadastrar");
	};

	const removerJogo = (id: number) => {
		setJogos((currentGames) => currentGames.filter((jogo) => jogo.id !== id));
		if (jogoEmEdicao?.id === id) {
			setJogoEmEdicao(null);
		}
		abrirFeedback("Jogo removido com sucesso.", "warning");
	};

	const cadastrarJogoJogado = (novoJogoJogado: JogoJogadoNovo) => {
		if (jogoJogadoEmEdicao) {
			setJogosJogados((currentJogosJogados) =>
				currentJogosJogados.map((jogoJogado) =>
					jogoJogado.id === jogoJogadoEmEdicao.id
						? { id: jogoJogadoEmEdicao.id, ...novoJogoJogado }
						: jogoJogado,
				),
			);
			setJogoJogadoEmEdicao(null);
			abrirFeedback("Jogo jogado atualizado.", "info");
			return;
		}

		setJogosJogados((atuais) => [
			...atuais,
			{ id: createId(), ...novoJogoJogado },
		]);
		abrirFeedback("Cadastrado com sucesso", "success");
	};

	const editarJogoJogado = (jogoJogado: JogoJogado) => {
		setJogoJogadoEmEdicao(jogoJogado);
		navigate("/jogosJogados/cadastrar");
	};

	const removerJogoJogado = (id: number) => {
		setJogosJogados((atuais) =>
			atuais.filter((jogoJogado) => jogoJogado.id !== id),
		);
		if (jogoJogadoEmEdicao?.id === id) {
			setJogoJogadoEmEdicao(null);
		}
		abrirFeedback("Jogo jogado removido com sucesso.", "warning");
	};

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/usuarios/*"
					element={
						<RoutesUsuario
							usuarios={usuarios}
							usuarioEmEdicao={usuarioEmEdicao}
							onCadastrarUsuario={cadastrarUsuario}
							onEditarUsuario={editarUsuario}
							onRemoverUsuario={removerUsuario}
							onCancelarEdicaoUsuario={() => setUsuarioEmEdicao(null)}
						/>
					}
				/>
				<Route
					path="/administradores/*"
					element={
						<RoutesAdministrador
							administradores={administradores}
							administradorEmEdicao={administradorEmEdicao}
							onCadastrarAdministrador={cadastrarAdministrador}
							onEditarAdministrador={editarAdministrador}
							onRemoverAdministrador={removerAdministrador}
							onCancelarEdicaoAdministrador={() =>
								setAdministradorEmEdicao(null)
							}
						/>
					}
				/>
				<Route
					path="/distribuidoras/*"
					element={
						<RoutesDistribuidora
							distribuidoras={distribuidoras}
							distribuidoraEmEdicao={distribuidoraEmEdicao}
							onCadastrarDistribuidora={cadastrarDistribuidora}
							onEditarDistribuidora={editarDistribuidora}
							onRemoverDistribuidora={removerDistribuidora}
							onCancelarEdicaoDistribuidora={() =>
								setDistribuidoraEmEdicao(null)
							}
						/>
					}
				/>
				<Route
					path="/jogos/*"
					element={
						<RoutesJogo
							jogos={jogos}
							distribuidoras={distribuidoras}
							jogoEmEdicao={jogoEmEdicao}
							onCadastrarJogo={cadastrarJogo}
							onEditarJogo={editarJogo}
							onRemoverJogo={removerJogo}
							onCancelarEdicaoJogo={() => setJogoEmEdicao(null)}
						/>
					}
				/>
				<Route
					path="/jogosJogados/*"
					element={
						<RoutesJogoJogado
							jogos={jogos}
							jogoJogadoEmEdicao={jogoJogadoEmEdicao}
							jogosJogados={jogosJogados}
							onCadastrarJogo={cadastrarJogoJogado}
							onCancelarEdicaoJogo={() => setJogoJogadoEmEdicao(null)}
							onEditarJogo={editarJogoJogado}
							onRemoverJogo={removerJogoJogado}
							usuarios={usuarios}
						/>
					}
				/>
			</Routes>

			<Snackbar
				open={feedback.open}
				autoHideDuration={3000}
				onClose={() => setFeedback((current) => ({ ...current, open: false }))}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			>
				<Alert severity={feedback.severity} variant="filled">
					{feedback.message}
				</Alert>
			</Snackbar>
		</>
	);
}
