import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceTable from '../components/InvoiceTable';
import { InvoiceContext } from '../contexts/InvoiceContext';
import { generatePDF } from '../utils/pdfGenerator';

function CreateInvoice() {
  const [formData, setFormData] = useState(null);
  const [items, setItems] = useState([]);
  const { addInvoiceToHistory } = useContext(InvoiceContext);
  const navigate = useNavigate();
  
  const handleFormSubmit = (data) => {
    setFormData(data);
  };
  
  const handleGeneratePDF = () => {
    if (!formData) {
      alert('Por favor, complete los datos de la factura primero.');
      return;
    }
    
    if (items.length === 0) {
      alert('Añada al menos un concepto a la factura.');
      return;
    }
    
    // Generar PDF utilizando la utilidad
    const pdfBlob = generatePDF(formData, items);
    
    // Guardar en historial
    const invoiceData = {
      id: Date.now().toString(),
      number: formData.invoiceNumber,
      date: formData.invoiceDate,
      clientName: formData.clientName,
      total: items.reduce((sum, item) => sum + item.total, 0).toFixed(2),
      items: items,
      formData: formData
    };
    
    addInvoiceToHistory(invoiceData);
    
    // Redirigir al historial
    navigate('/history');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Factura</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <InvoiceForm onChange={handleFormSubmit} />
        
        <InvoiceTable items={items} setItems={setItems} />
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleGeneratePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;