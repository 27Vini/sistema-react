import {
	EnumStatus,
	JogoJogado,
} from "../modules/jogosJogados/types/JogosJogados";

export const jogosJogadosMock: JogoJogado[] = [
	{
		id: 1,
		estrela: 4,
		status: EnumStatus.finalizado,
		jogoId: 1,
		usuarioId: 1,
	},
	{
		id: 2,
		estrela: 5,
		status: EnumStatus.finalizado,
		jogoId: 2,
		usuarioId: 1,
	},
	{
		id: 3,
		estrela: 3,
		status: EnumStatus.finalizado,
		jogoId: 3,
		usuarioId: 2,
	},
];
