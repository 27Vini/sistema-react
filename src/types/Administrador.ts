import type { Usuario } from "./Usuario";

export interface Administrador extends Usuario {
	setor: string;
	codigoAcesso: string;
}

export type NovoAdministrador = Omit<Administrador, "id">;
