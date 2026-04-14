import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import commonStyles from '../../../styles/MuiCommon.module.css';
import type { NovoAdministrador, Administrador } from '../types/Administrador';

interface FormularioAdministradorProps {
  administradorEmEdicao: Administrador | null;
  onSubmit: (administrador: NovoAdministrador) => void;
  onCancelarEdicao: () => void;
}

interface FormState {
  nome: string;
  email: string;
  senha: string;
  setor: string;
  codigoAcesso: string;
}

const initialState: FormState = {
  nome: '',
  email: '',
  senha: '',
  setor: '',
  codigoAcesso: '',
};

export function FormularioAdministrador({
  administradorEmEdicao,
  onSubmit,
  onCancelarEdicao,
}: FormularioAdministradorProps) {
  const [formState, setFormState] = useState<FormState>(initialState);

  useEffect(() => {
    if (administradorEmEdicao) {
      setFormState({
        nome: administradorEmEdicao.nome,
        email: administradorEmEdicao.email,
        senha: administradorEmEdicao.senha,
        setor: administradorEmEdicao.setor,
        codigoAcesso: administradorEmEdicao.codigoAcesso,
      });
      return;
    }

    setFormState(initialState);
  }, [administradorEmEdicao]);

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
        {administradorEmEdicao ? 'Atualizar administrador' : 'Novo administrador'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="ID" value={administradorEmEdicao?.id ?? ''} disabled fullWidth />
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
          <TextField
            label="Setor"
            name="setor"
            value={formState.setor}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Codigo de acesso"
            name="codigoAcesso"
            value={formState.codigoAcesso}
            onChange={handleChange}
            required
            fullWidth
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button type="submit" variant="contained">
              {administradorEmEdicao ? 'Atualizar' : 'Cadastrar'}
            </Button>
            {administradorEmEdicao ? (
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
