import type { Distribuidora } from '../../distribuidora/types/Distribuidora';
import { ListaJogos } from '../components/ListaJogos';
import type { Jogo } from '../types/Jogo';

interface ListarJogosProps {
  jogos: Jogo[];
  distribuidoras: Distribuidora[];
  onEditarJogo: (jogo: Jogo) => void;
  onRemoverJogo: (id: number) => void;
}

export default function ListarJogos({
  jogos,
  distribuidoras,
  onEditarJogo,
  onRemoverJogo,
}: ListarJogosProps) {
  return (
    <>
      <h2>Listar jogos</h2>
      <ListaJogos
        jogos={jogos}
        distribuidoras={distribuidoras}
        onEditarJogo={onEditarJogo}
        onRemoverJogo={onRemoverJogo}
      />
    </>
  );
}
