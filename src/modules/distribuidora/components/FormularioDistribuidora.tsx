import {
	useEffect,
	useState,
	type ChangeEvent,
	type SyntheticEvent,
} from "react";
import {
	Box,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import commonStyles from "../../../styles/MuiCommon.module.css";
import type { NovoDistribuidora, Distribuidora } from "../../../types/Distribuidora";

interface FormularioDistribuidoraProps {
	distribuidoraEmEdicao: Distribuidora | null;
	onSubmit: (distribuidora: NovoDistribuidora) => void;
	onCancelarEdicao: () => void;
}

interface FormState {
	nome: string;
	pais: string;
	anoFundacao: string;
}

const initialState: FormState = {
	nome: "",
	pais: "",
	anoFundacao: "",
};

export function FormularioDistribuidora({
	distribuidoraEmEdicao,
	onSubmit,
	onCancelarEdicao,
}: FormularioDistribuidoraProps) {
	const [formState, setFormState] = useState<FormState>(initialState);

	useEffect(() => {
		if (distribuidoraEmEdicao) {
			setFormState({
				nome: distribuidoraEmEdicao.nome,
				pais: distribuidoraEmEdicao.pais,
				anoFundacao: String(distribuidoraEmEdicao.anoFundacao),
			});
			return;
		}

		setFormState(initialState);
	}, [distribuidoraEmEdicao]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormState((currentState) => ({
			...currentState,
			[name]: value,
		}));
	};

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		onSubmit({
			nome: formState.nome,
			pais: formState.pais,
			anoFundacao: Number(formState.anoFundacao),
		});

		setFormState(initialState);
	};

	return (
		<Paper className={commonStyles.paperSection}>
			<Typography variant="h6" gutterBottom>
				{distribuidoraEmEdicao
					? "Atualizar distribuidora"
					: "Nova distribuidora"}
			</Typography>

			<Box component="form" onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<TextField
						label="ID"
						value={distribuidoraEmEdicao?.id ?? ""}
						disabled
						fullWidth
					/>
					<TextField
						label="Nome"
						name="nome"
						value={formState.nome}
						onChange={handleChange}
						required
						fullWidth
					/>
					<TextField
						label="Pais"
						name="pais"
						value={formState.pais}
						onChange={handleChange}
						required
						fullWidth
					/>
					<TextField
						label="Ano de fundacao"
						type="number"
						name="anoFundacao"
						value={formState.anoFundacao}
						onChange={handleChange}
						required
						fullWidth
					/>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Button type="submit" variant="contained">
							{distribuidoraEmEdicao ? "Atualizar" : "Cadastrar"}
						</Button>
						{distribuidoraEmEdicao ? (
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
