import type { Pessoa } from "./Pessoa";

export interface Usuario extends Pessoa {}

export type NovoUsuario = Omit<Usuario, "id">;
