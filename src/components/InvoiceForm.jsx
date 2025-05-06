import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { InvoiceContext } from '../contexts/InvoiceContext';

function InvoiceForm({ onChange }) {
  const { settings } = useContext(InvoiceContext);
  const { register, watch, formState: { errors } } = useForm({
    defaultValues: {
      companyName: settings?.companyName || '',
      companyAddress: settings?.companyAddress || '',
      companyTaxId: settings?.companyTaxId || '',
      clientName: '',
      clientAddress: '',
      clientTaxId: '',
      invoiceNumber: '',
      invoiceDate: new Date().toISOString().substr(0, 10),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().substr(0, 10),
    }
  });

  // Subscribe to form changes without causing rerender loops
  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información de la empresa */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Datos de la Empresa</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              {...register('companyName', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              {...register('companyAddress', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.companyAddress && <p className="text-red-500 text-xs mt-1">{errors.companyAddress.message}</p>}
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
            {errors.companyTaxId && <p className="text-red-500 text-xs mt-1">{errors.companyTaxId.message}</p>}
          </div>
        </div>

        {/* Información del cliente */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Datos del Cliente</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Cliente
            </label>
            <input
              type="text"
              {...register('clientName', { required: 'Este campo es obligatorio' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              {...register('clientAddress')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIF/CIF
            </label>
            <input
              type="text"
              {...register('clientTaxId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Información de la factura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de Factura
          </label>
          <input
            type="text"
            {...register('invoiceNumber', { required: 'Este campo es obligatorio' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.invoiceNumber && <p className="text-red-500 text-xs mt-1">{errors.invoiceNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Emisión
          </label>
          <input
            type="date"
            {...register('invoiceDate', { required: 'Este campo es obligatorio' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.invoiceDate && <p className="text-red-500 text-xs mt-1">{errors.invoiceDate.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            {...register('dueDate', { required: 'Este campo es obligatorio' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
