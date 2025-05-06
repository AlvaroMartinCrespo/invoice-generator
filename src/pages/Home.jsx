import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Generador de Facturas</h1>
      <p className="text-lg mb-8">
        Una aplicación simple para crear, gestionar y descargar facturas en formato PDF.
      </p>
      <div className="flex justify-center space-x-4">
        <Link 
          to="/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Crear Nueva Factura
        </Link>
        <Link 
          to="/history" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium"
        >
          Ver Historial
        </Link>
      </div>
    </div>
  );
}

export default Home;