import { useState } from 'react';

const ProductActions = ({ product, onAddToCart }) => {
  // Verificar que existen las opciones antes de usarlas
  const colors = product?.options?.colors || [];
  const storages = product?.options?.storages || [];
  
  const [selectedColor, setSelectedColor] = useState(colors.length > 0 ? colors[0].code : null);
  const [selectedStorage, setSelectedStorage] = useState(storages.length > 0 ? storages[0].code : null);
  const [adding, setAdding] = useState(false);
  
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage) {
      alert('Por favor, selecciona todas las opciones');
      return;
    }
    
    setAdding(true);
    try {
      await onAddToCart({
        id: product.id,
        colorCode: selectedColor,
        storageCode: selectedStorage
      });
    } finally {
      setAdding(false);
    }
  };
  
  const selectedColorObj = colors.find(c => c.code === selectedColor);
  const selectedStorageObj = storages.find(s => s.code === selectedStorage);
  
  // Si no hay opciones disponibles
  if (colors.length === 0 || storages.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Opciones del producto</h3>
        <p className="text-gray-600">No hay opciones disponibles para este producto.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Opciones del producto</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Almacenamiento
        </label>
        <select
          value={selectedStorage || ''}
          onChange={(e) => setSelectedStorage(Number(e.target.value))}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          {storages.map(storage => (
            <option key={storage.code} value={storage.code}>
              {storage.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Color
        </label>
        <select
          value={selectedColor || ''}
          onChange={(e) => setSelectedColor(Number(e.target.value))}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        >
          {colors.map(color => (
            <option key={color.code} value={color.code}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
      
      {selectedStorageObj && selectedColorObj && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">Selección actual:</p>
          <p className="font-semibold text-gray-900">
            {selectedStorageObj.name} - {selectedColorObj.name}
          </p>
        </div>
      )}
      
      <button
        onClick={handleAddToCart}
        disabled={adding || !selectedColor || !selectedStorage}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {adding ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>
    </div>
  );
};

export default ProductActions;