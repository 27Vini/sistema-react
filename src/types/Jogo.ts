export interface Jogo {
	id: number;
	titulo: string;
	genero: string;
	plataforma: string;
	anoLancamento: number;
	distribuidoraId: number;
}

export type NovoJogo = Omit<Jogo, "id">;
