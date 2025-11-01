const ProductItem = ({ product, onClick }) => {
  const displayPrice = product.price ? `${product.price}€` : 'Precio no disponible';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center p-6">
        <img 
          src={product.imgUrl} 
          alt={`${product.brand} ${product.model}`}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen';
          }}
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 font-semibold">{product.brand || 'Marca desconocida'}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.model || 'Modelo desconocido'}</h3>
        <p className={`text-2xl font-bold ${product.price ? 'text-blue-600' : 'text-gray-400'}`}>
          {displayPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;