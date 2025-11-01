import { useState, useEffect } from 'react';
import Router from './utils/router';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { addToCart } from './services/api';

function App() {
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem('cartCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const handleAddToCart = async (productData) => {
    try {
      const response = await addToCart(productData);
      console.log('Respuesta del carrito:', response);
      
      // Actualizar con el valor que devuelve la API
      const newCount = response.count;
      setCartCount(newCount);
      localStorage.setItem('cartCount', newCount.toString());
      
      alert('✅ Producto añadido al carrito correctamente');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('❌ Error al añadir el producto al carrito');
    }
  };
  
  return (
    <Router>
      {({ currentPath, navigate }) => {
        const productMatch = currentPath.match(/#\/product\/(\w+)/);
        const productId = productMatch ? productMatch[1] : null;
        
        return (
          <div className="min-h-screen bg-gray-100">
            <Header cartCount={cartCount} />
            
            <main className="max-w-7xl mx-auto px-4 py-8">
              {productId ? (
                <ProductDetailPage 
                  productId={productId}
                  navigate={navigate}
                  onAddToCart={handleAddToCart}
                />
              ) : (
                <ProductListPage navigate={navigate} />
              )}
            </main>
          </div>
        );
      }}
    </Router>
  );
}

export default App;