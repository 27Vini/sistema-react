import { Route, Routes } from 'react-router-dom';
import CadastraDistribuidora from './pages/CadastraDistribuidora';
import ListarDistribuidoras from './pages/ListarDistribuidoras';
import type { NovoDistribuidora, Distribuidora } from './types/Distribuidora';

interface DistribuidoraRoutesProps {
  distribuidoras: Distribuidora[];
  distribuidoraEmEdicao: Distribuidora | null;
  onCadastrarDistribuidora: (distribuidora: NovoDistribuidora) => void;
  onEditarDistribuidora: (distribuidora: Distribuidora) => void;
  onRemoverDistribuidora: (id: number) => void;
  onCancelarEdicaoDistribuidora: () => void;
}

export default function RoutesDistribuidora({
  distribuidoras,
  distribuidoraEmEdicao,
  onCadastrarDistribuidora,
  onEditarDistribuidora,
  onRemoverDistribuidora,
  onCancelarEdicaoDistribuidora,
}: DistribuidoraRoutesProps) {
  return (
    <Routes>
      <Route
        path="/cadastrar"
        element={
          <CadastraDistribuidora
            distribuidoraEmEdicao={distribuidoraEmEdicao}
            onCadastrarDistribuidora={onCadastrarDistribuidora}
            onCancelarEdicao={onCancelarEdicaoDistribuidora}
          />
        }
      />
      <Route
        path="/listar"
        element={
          <ListarDistribuidoras
            distribuidoras={distribuidoras}
            onEditarDistribuidora={onEditarDistribuidora}
            onRemoverDistribuidora={onRemoverDistribuidora}
          />
        }
      />
    </Routes>
  );
}
