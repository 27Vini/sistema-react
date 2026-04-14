import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import commonStyles from '../../../styles/MuiCommon.module.css';
import type { NovoUsuario, Usuario } from '../types/Usuario';

interface FormularioUsuarioProps {
  usuarioEmEdicao: Usuario | null;
  onSubmit: (usuario: NovoUsuario) => void;
  onCancelarEdicao: () => void;
}

interface FormState {
  nome: string;
  email: string;
  senha: string;
}

const initialState: FormState = {
  nome: '',
  email: '',
  senha: '',
};

export function FormularioUsuario({
  usuarioEmEdicao,
  onSubmit,
  onCancelarEdicao,
}: FormularioUsuarioProps) {
  const [formState, setFormState] = useState<FormState>(initialState);

  useEffect(() => {
    if (usuarioEmEdicao) {
      setFormState({
        nome: usuarioEmEdicao.nome,
        email: usuarioEmEdicao.email,
        senha: usuarioEmEdicao.senha,
      });
      return;
    }

    setFormState(initialState);
  }, [usuarioEmEdicao]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formState);
    setFormState(initialState);
  };

  return (
    <Paper className={commonStyles.paperSection}>
      <Typography variant="h6" gutterBottom>
        {usuarioEmEdicao ? 'Atualizar usuario' : 'Novo usuario'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="ID" value={usuarioEmEdicao?.id ?? ''} disabled fullWidth />
          <TextField
            label="Nome"
            name="nome"
            value={formState.nome}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Senha"
            type="password"
            name="senha"
            value={formState.senha}
            onChange={handleChange}
            required
            fullWidth
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button type="submit" variant="contained">
              {usuarioEmEdicao ? 'Atualizar' : 'Cadastrar'}
            </Button>
            {usuarioEmEdicao ? (
              <Button type="button" variant="outlined" onClick={onCancelarEdicao}>
                Cancelar
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
