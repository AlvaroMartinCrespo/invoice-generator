import { useState } from 'react';

function InvoiceTable({ items, setItems }) {
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    price: 0,
  });

  const addItem = () => {
    if (newItem.description.trim() === '') return;
    
    const itemWithTotal = {
      ...newItem,
      total: newItem.quantity * newItem.price
    };
    
    setItems([...items, itemWithTotal]);
    setNewItem({ description: '', quantity: 1, price: 0 });
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === 'description' ? value : parseFloat(value) || 0
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Conceptos</h2>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Precio Unitario</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.price.toFixed(2)} €</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{item.total.toFixed(2)} €</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button 
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          
          {/* Fila para añadir nuevo concepto */}
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="text"
                name="description"
                value={newItem.description}
                onChange={handleChange}
                placeholder="Descripción del concepto"
                className="w-full px-2 py-1"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-2 py-1 text-center"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-2 py-1 text-center"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {(newItem.quantity * newItem.price).toFixed(2)} €
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button 
                onClick={addItem}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Añadir
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-bold">
            <td colSpan="3" className="border border-gray-300 px-4 py-2 text-right">
              Total:
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              {calculateTotal()} €
            </td>
            <td className="border border-gray-300"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default InvoiceTable;