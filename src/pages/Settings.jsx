import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { InvoiceContext } from '../contexts/InvoiceContext';

function Settings() {
  const { settings, updateSettings } = useContext(InvoiceContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      companyName: settings?.companyName || '',
      companyAddress: settings?.companyAddress || '',
      companyTaxId: settings?.companyTaxId || '',
      companyEmail: settings?.companyEmail || '',
      companyPhone: settings?.companyPhone || '',
      companyLogo: settings?.companyLogo || '',
      primaryColor: settings?.primaryColor || '#3B82F6', // Color azul por defecto
    }
  });
  
  const onSubmit = (data) => {
    updateSettings(data);
    alert('Configuración guardada correctamente');
  };
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      // Se actualiza solo el logo en el formulario
      const logoDataUrl = e.target.result;
      updateSettings({ ...settings, companyLogo: logoDataUrl });
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold">Datos de la Empresa</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                {...register('companyName', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIF/CIF
              </label>
              <input
                type="text"
                {...register('companyTaxId', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.companyTaxId && (
                <p className="text-red-500 text-xs mt-1">{errors.companyTaxId.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <input
                type="text"
                {...register('companyAddress', { required: 'Este campo es obligatorio' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.companyAddress && (
                <p className="text-red-500 text-xs mt-1">{errors.companyAddress.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('companyEmail')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                {...register('companyPhone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <h2 className="text-xl font-semibold pt-4">Personalización</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo de la Empresa
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">
                Formato recomendado: PNG o JPG, máximo 500KB
              </p>
              
              {settings?.companyLogo && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">Logo actual:</p>
                  <img 
                    src={settings.companyLogo} 
                    alt="Logo de la empresa" 
                    className="h-16 object-contain"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Principal
              </label>
              <input
                type="color"
                {...register('primaryColor')}
                className="w-full h-10 px-1 py-1 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">
                Este color se utilizará en los encabezados de la factura
              </p>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;