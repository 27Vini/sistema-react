export enum EnumStatus {
	finalizado = "FINALIZADO",
	jogando = "JOGANDO",
	abandonado = "ABANDONADO",
}

export type JogoJogado = {
	id: number;
	usuarioId: number;
	jogoId: number;
	status: EnumStatus;
	estrela: number;
};

export type JogoJogadoNovo = Omit<JogoJogado, "id">;
