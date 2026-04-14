import {
	useEffect,
	useState,
	type ChangeEvent,
	type SyntheticEvent,
} from "react";
import {
	Box,
	Button,
	MenuItem,
	Paper,
	Rating,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import commonStyles from "../../../styles/MuiCommon.module.css";
import { Jogo } from "../../../types/Jogo";
import { Usuario } from "../../../types/Usuario";
import { EnumStatus, JogoJogado, JogoJogadoNovo } from "../types/JogosJogados";

interface FormularioJogoJogadoProps {
	jogos: Jogo[];
	usuarios: Usuario[];
	jogosJogados: JogoJogado[];
	jogoJogadoEmEdicao: JogoJogado | null;
	onSubmit: (jogoJogado: JogoJogadoNovo) => void;
	onCancelarEdicao: () => void;
}

interface FormState {
	usuarioId: string;
	jogoId: string;
	status: EnumStatus;
	estrela: number;
}

const createInitialState = (jogos: Jogo[], usuarios: Usuario[]): FormState => ({
	usuarioId: usuarios[0] ? String(usuarios[0].id) : "",
	jogoId: jogos[0] ? String(jogos[0].id) : "",
	status: EnumStatus.jogando,
	estrela: 0,
});

export function FormularioJogoJogado({
	jogos,
	usuarios,
	jogosJogados,
	jogoJogadoEmEdicao,
	onSubmit,
	onCancelarEdicao,
}: FormularioJogoJogadoProps) {
	const [formState, setFormState] = useState<FormState>(() =>
		createInitialState(jogos, usuarios),
	);

	useEffect(() => {
		if (jogoJogadoEmEdicao) {
			setFormState({
				usuarioId: String(jogoJogadoEmEdicao.usuarioId),
				jogoId: String(jogoJogadoEmEdicao.jogoId),
				status: jogoJogadoEmEdicao.status,
				estrela: jogoJogadoEmEdicao.estrela,
			});
			return;
		}

		setFormState(createInitialState(jogos, usuarios));
	}, [jogoJogadoEmEdicao, jogos, usuarios]);

	const jogosDisponiveis = jogos.filter((jogo) => {
		if (!formState.usuarioId) {
			return false;
		}

		const jogoJaCadastradoParaUsuario = jogosJogados.some(
			(jogoJogado) =>
				jogoJogado.usuarioId === Number(formState.usuarioId) &&
				jogoJogado.jogoId === jogo.id &&
				jogoJogado.id !== jogoJogadoEmEdicao?.id,
		);

		return !jogoJaCadastradoParaUsuario;
	});

	useEffect(() => {
		if (
			jogoJogadoEmEdicao &&
			formState.usuarioId !== String(jogoJogadoEmEdicao.usuarioId)
		) {
			return;
		}

		if (jogosDisponiveis.length === 0) {
			setFormState((currentState) => ({
				...currentState,
				jogoId: "",
			}));
			return;
		}

		const jogoSelecionadoDisponivel = jogosDisponiveis.some(
			(jogo) => String(jogo.id) === formState.jogoId,
		);

		if (!jogoSelecionadoDisponivel) {
			setFormState((currentState) => ({
				...currentState,
				jogoId: String(jogosDisponiveis[0].id),
			}));
		}
	}, [
		formState.jogoId,
		formState.usuarioId,
		jogoJogadoEmEdicao,
		jogosDisponiveis,
	]);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target;

		setFormState((currentState) => ({
			...currentState,
			[name]: value,
		}));
	};

	const handleChangeEstrela = (
		_event: SyntheticEvent,
		value: number | null,
	) => {
		setFormState((currentState) => ({
			...currentState,
			estrela: value ?? 0,
		}));
	};

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!formState.usuarioId || !formState.jogoId) {
			return;
		}

		onSubmit({
			usuarioId: Number(formState.usuarioId),
			jogoId: Number(formState.jogoId),
			status: formState.status,
			estrela: formState.estrela,
		});

		setFormState(createInitialState(jogos, usuarios));
	};

	const formularioDesabilitado =
		jogos.length === 0 ||
		usuarios.length === 0 ||
		jogosDisponiveis.length === 0;

	return (
		<Paper className={commonStyles.paperSection}>
			<Typography variant="h6" gutterBottom>
				{jogoJogadoEmEdicao ? "Atualizar jogo jogado" : "Novo jogo jogado"}
			</Typography>

			<Box component="form" onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<TextField
						label="ID"
						value={jogoJogadoEmEdicao?.id ?? ""}
						disabled
						fullWidth
					/>
					<TextField
						select
						label="Usuario"
						name="usuarioId"
						value={formState.usuarioId}
						onChange={handleChange}
						required
						fullWidth
						disabled={usuarios.length === 0}
						helperText={
							usuarios.length === 0
								? "Cadastre um usuario antes de registrar um jogo jogado."
								: "Selecione o usuario dono desse registro."
						}
					>
						{usuarios.map((usuario) => (
							<MenuItem key={usuario.id} value={String(usuario.id)}>
								{usuario.nome}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						label="Jogo"
						name="jogoId"
						value={formState.jogoId}
						onChange={handleChange}
						required
						fullWidth
						disabled={jogos.length === 0 || jogosDisponiveis.length === 0}
						helperText={
							jogos.length === 0
								? "Cadastre um jogo antes de registrar um jogo jogado."
								: jogosDisponiveis.length === 0
									? "Esse usuario ja possui registro para todos os jogos disponiveis."
									: "Selecione qual jogo foi jogado."
						}
					>
						{jogosDisponiveis.map((jogo) => (
							<MenuItem key={jogo.id} value={String(jogo.id)}>
								{jogo.titulo}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						label="Status"
						name="status"
						value={formState.status}
						onChange={handleChange}
						required
						fullWidth
					>
						{Object.values(EnumStatus).map((status) => (
							<MenuItem key={status} value={status}>
								{status}
							</MenuItem>
						))}
					</TextField>
					<Box>
						<Typography component="label" gutterBottom>
							Estrelas
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Rating
								name="estrela"
								value={formState.estrela}
								max={5}
								onChange={handleChangeEstrela}
							/>
							<Typography variant="body2">{formState.estrela}/5</Typography>
						</Box>
					</Box>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Button
							type="submit"
							variant="contained"
							disabled={formularioDesabilitado}
						>
							{jogoJogadoEmEdicao ? "Atualizar" : "Cadastrar"}
						</Button>
						{jogoJogadoEmEdicao ? (
							<Button
								type="button"
								variant="outlined"
								onClick={onCancelarEdicao}
							>
								Cancelar
							</Button>
						) : null}
					</Stack>
				</Stack>
			</Box>
		</Paper>
	);
}
