import { FormularioDistribuidora } from '../components/FormularioDistribuidora';
import type { NovoDistribuidora, Distribuidora } from '../types/Distribuidora';

interface CadastraDistribuidoraProps {
  distribuidoraEmEdicao: Distribuidora | null;
  onCadastrarDistribuidora: (distribuidora: NovoDistribuidora) => void;
  onCancelarEdicao: () => void;
}

export default function CadastraDistribuidora({
  distribuidoraEmEdicao,
  onCadastrarDistribuidora,
  onCancelarEdicao,
}: CadastraDistribuidoraProps) {
  return (
    <>
      <h2>{distribuidoraEmEdicao ? 'Atualizar distribuidora' : 'Cadastrar distribuidora'}</h2>
      <FormularioDistribuidora
        distribuidoraEmEdicao={distribuidoraEmEdicao}
        onSubmit={onCadastrarDistribuidora}
        onCancelarEdicao={onCancelarEdicao}
      />
    </>
  );
}
