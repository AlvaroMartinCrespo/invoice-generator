import { createContext, useState, useEffect } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  // Cargar facturas y configuración desde localStorage
  const [invoices, setInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem('invoices');
    return savedInvoices ? JSON.parse(savedInvoices) : [];
  });
  
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('invoiceSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      companyName: '',
      companyAddress: '',
      companyTaxId: '',
      companyEmail: '',
      companyPhone: '',
      companyLogo: null,
      primaryColor: '#3B82F6',
    };
  });
  
  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);
  
  useEffect(() => {
    localStorage.setItem('invoiceSettings', JSON.stringify(settings));
  }, [settings]);
  
  // Funciones para gestionar facturas
  const addInvoiceToHistory = (invoice) => {
    setInvoices([...invoices, invoice]);
  };
  
  const removeInvoiceFromHistory = (invoiceId) => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
  };
  
  // Función para actualizar configuración
  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };
  
  return (
    <InvoiceContext.Provider value={{
      invoices,
      settings,
      addInvoiceToHistory,
      removeInvoiceFromHistory,
      updateSettings
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};
