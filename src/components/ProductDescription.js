const ProductDescription = ({ product }) => {
  // Función auxiliar para mostrar valores de forma segura
  const displayValue = (value) => {
    if (value === undefined || value === null) return 'N/A';
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'N/A';
    }
    return value;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {product.brand} {product.model}
      </h2>
      <p className="text-3xl font-bold text-blue-600 mb-6">{product.price}€</p>
      
      <div className="space-y-3">
        <DetailRow label="CPU" value={displayValue(product.cpu)} />
        <DetailRow label="RAM" value={displayValue(product.ram)} />
        <DetailRow label="Sistema Operativo" value={displayValue(product.os)} />
        <DetailRow label="Resolución" value={displayValue(product.displayResolution)} />
        <DetailRow label="Batería" value={displayValue(product.battery)} />
        <DetailRow label="Cámaras" value={displayValue(product.primaryCamera)} />
        <DetailRow label="Dimensiones" value={displayValue(product.dimentions)} />
        <DetailRow label="Peso" value={product.weight ? `${product.weight}g` : 'N/A'} />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-200">
    <span className="text-gray-600 font-semibold">{label}:</span>
    <span className="text-gray-900 text-right">{value}</span>
  </div>
);

export default ProductDescription;