import { Route, Routes } from 'react-router-dom';
import CadastraUsuario from './pages/CadastraUsuario';
import ListarUsuarios from './pages/ListarUsuarios';
import type { NovoUsuario, Usuario } from './types/Usuario';

interface UsuarioRoutesProps {
  usuarios: Usuario[];
  usuarioEmEdicao: Usuario | null;
  onCadastrarUsuario: (usuario: NovoUsuario) => void;
  onEditarUsuario: (usuario: Usuario) => void;
  onRemoverUsuario: (id: number) => void;
  onCancelarEdicaoUsuario: () => void;
}

export default function RoutesUsuario({
  usuarios,
  usuarioEmEdicao,
  onCadastrarUsuario,
  onEditarUsuario,
  onRemoverUsuario,
  onCancelarEdicaoUsuario,
}: UsuarioRoutesProps) {
  return (
    <Routes>
      <Route
        path="/cadastrar"
        element={
          <CadastraUsuario
            usuarioEmEdicao={usuarioEmEdicao}
            onCadastrarUsuario={onCadastrarUsuario}
            onCancelarEdicao={onCancelarEdicaoUsuario}
          />
        }
      />
      <Route
        path="/listar"
        element={
          <ListarUsuarios
            usuarios={usuarios}
            onEditarUsuario={onEditarUsuario}
            onRemoverUsuario={onRemoverUsuario}
          />
        }
      />
    </Routes>
  );
}
