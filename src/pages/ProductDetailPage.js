import { useState, useEffect } from 'react';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDescription';
import ProductActions from '../components/ProductActions';
import { getProduct } from '../services/api';

const ProductDetailPage = ({ productId, navigate, onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProduct(productId);
        console.log('Producto cargado:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [productId]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Cargando producto...</div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">
          {error || 'Producto no encontrado'}
        </p>
        <button
          onClick={() => navigate('#/')}
          className="text-blue-600 hover:underline font-semibold"
        >
          ← Volver a la lista
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <button
        onClick={() => navigate('#/')}
        className="mb-6 text-blue-600 hover:underline flex items-center space-x-2 font-semibold"
      >
        <span>←</span>
        <span>Volver a productos</span>
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductImage 
          imgUrl={product.imgUrl}
          brand={product.brand}
          model={product.model}
        />
        
        <div>
          <ProductDescription product={product} />
          <ProductActions product={product} onAddToCart={onAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;