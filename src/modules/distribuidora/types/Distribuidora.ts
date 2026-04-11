export interface Distribuidora {
  id: number;
  nome: string;
  pais: string;
  anoFundacao: number;
}

export type NovoDistribuidora = Omit<Distribuidora, 'id'>;
