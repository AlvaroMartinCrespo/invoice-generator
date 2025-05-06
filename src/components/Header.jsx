import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Generador de Facturas</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-200">Inicio</Link></li>
            <li><Link to="/create" className="hover:text-blue-200">Crear Factura</Link></li>
            <li><Link to="/history" className="hover:text-blue-200">Historial</Link></li>
            <li><Link to="/settings" className="hover:text-blue-200">Configuración</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;