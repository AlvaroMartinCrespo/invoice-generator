import { useContext } from 'react';
import { InvoiceContext } from '../contexts/InvoiceContext';
import { generatePDF } from '../utils/pdfGenerator';

function History() {
  const { invoices, removeInvoiceFromHistory } = useContext(InvoiceContext);
  
  const handleDownload = (invoice) => {
    generatePDF(invoice.formData, invoice.items);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES').format(date);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Historial de Facturas</h1>
      
      {invoices.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">No hay facturas en el historial.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b px-6 py-3 text-left">Nº Factura</th>
                <th className="border-b px-6 py-3 text-left">Fecha</th>
                <th className="border-b px-6 py-3 text-left">Cliente</th>
                <th className="border-b px-6 py-3 text-right">Total</th>
                <th className="border-b px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="border-b px-6 py-4">{invoice.number}</td>
                  <td className="border-b px-6 py-4">{formatDate(invoice.date)}</td>
                  <td className="border-b px-6 py-4">{invoice.clientName}</td>
                  <td className="border-b px-6 py-4 text-right">{invoice.total} €</td>
                  <td className="border-b px-6 py-4 text-center">
                    <button
                      onClick={() => handleDownload(invoice)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Descargar
                    </button>
                    <button
                      onClick={() => removeInvoiceFromHistory(invoice.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default History;