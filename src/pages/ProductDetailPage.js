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
      
      console.log('🔍 Cargando producto con ID:', productId);
      
      try {
        const data = await getProduct(productId);
        
        if (!data) {
          throw new Error('No se recibieron datos del producto');
        }
        
        console.log('✅ Producto cargado exitosamente:', data);
        setProduct(data);
      } catch (error) {
        console.error('❌ Error loading product:', error);
        setError(error.message || 'No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      loadProduct();
    }
  }, [productId]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-xl text-gray-600">Cargando producto...</div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto mb-6">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-xl text-red-600 font-semibold mb-2">
            {error || 'Producto no encontrado'}
          </p>
          <p className="text-sm text-gray-600">
            ID del producto: {productId}
          </p>
        </div>
        <button
          onClick={() => navigate('#/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          ← Volver a la lista de productos
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