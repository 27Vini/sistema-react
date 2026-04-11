import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import commonStyles from '../../../styles/MuiCommon.module.css';
import type { Distribuidora } from '../../distribuidora/types/Distribuidora';
import type { NovoJogo, Jogo } from '../types/Jogo';

interface FormularioJogoProps {
  distribuidoras: Distribuidora[];
  jogoEmEdicao: Jogo | null;
  onSubmit: (jogo: NovoJogo) => void;
  onCancelarEdicao: () => void;
}

interface FormState {
  titulo: string;
  genero: string;
  plataforma: string;
  anoLancamento: string;
  distribuidoraId: string;
}

const createInitialState = (distribuidoras: Distribuidora[]): FormState => ({
  titulo: '',
  genero: '',
  plataforma: '',
  anoLancamento: '',
  distribuidoraId: distribuidoras[0] ? String(distribuidoras[0].id) : '',
});

export function FormularioJogo({
  distribuidoras,
  jogoEmEdicao,
  onSubmit,
  onCancelarEdicao,
}: FormularioJogoProps) {
  const [formState, setFormState] = useState<FormState>(() => createInitialState(distribuidoras));

  useEffect(() => {
    if (jogoEmEdicao) {
      setFormState({
        titulo: jogoEmEdicao.titulo,
        genero: jogoEmEdicao.genero,
        plataforma: jogoEmEdicao.plataforma,
        anoLancamento: String(jogoEmEdicao.anoLancamento),
        distribuidoraId: String(jogoEmEdicao.distribuidoraId),
      });
      return;
    }

    setFormState(createInitialState(distribuidoras));
  }, [jogoEmEdicao, distribuidoras]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.distribuidoraId) {
      return;
    }

    onSubmit({
      titulo: formState.titulo,
      genero: formState.genero,
      plataforma: formState.plataforma,
      anoLancamento: Number(formState.anoLancamento),
      distribuidoraId: Number(formState.distribuidoraId),
    });

    setFormState(createInitialState(distribuidoras));
  };

  return (
    <Paper className={commonStyles.paperSection}>
      <Typography variant="h6" gutterBottom>
        {jogoEmEdicao ? 'Atualizar jogo' : 'Novo jogo'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="ID" value={jogoEmEdicao?.id ?? ''} disabled fullWidth />
          <TextField
            label="Titulo"
            name="titulo"
            value={formState.titulo}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Genero"
            name="genero"
            value={formState.genero}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Plataforma"
            name="plataforma"
            value={formState.plataforma}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Ano de lancamento"
            type="number"
            name="anoLancamento"
            value={formState.anoLancamento}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            select
            label="Distribuidora"
            name="distribuidoraId"
            value={formState.distribuidoraId}
            onChange={handleChange}
            required
            fullWidth
            disabled={distribuidoras.length === 0}
            helperText={
              distribuidoras.length === 0
                ? 'Cadastre uma distribuidora antes de cadastrar jogos.'
                : 'Selecione a distribuidora responsavel pelo jogo.'
            }
          >
            {distribuidoras.map((distribuidora) => (
              <MenuItem key={distribuidora.id} value={distribuidora.id}>
                {distribuidora.nome}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button type="submit" variant="contained" disabled={distribuidoras.length === 0}>
              {jogoEmEdicao ? 'Atualizar' : 'Cadastrar'}
            </Button>
            {jogoEmEdicao ? (
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
