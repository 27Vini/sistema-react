import type { Usuario } from '../../usuario/types/Usuario';

export interface Administrador extends Usuario {
  setor: string;
  codigoAcesso: string;
}

export type NovoAdministrador = Omit<Administrador, 'id'>;
