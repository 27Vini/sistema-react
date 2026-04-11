import type { Pessoa } from '../../../types/Pessoa';

export interface Usuario extends Pessoa {}

export type NovoUsuario = Omit<Usuario, 'id'>;
