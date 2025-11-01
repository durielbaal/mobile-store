import { useState } from 'react';
import Router from './utils/router';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { addToCart, getCartCount } from './services/api';

function App() {
  const [cartCount, setCartCount] = useState(() => {
    // Inicializamos con el carrito almacenado localmente
    return getCartCount();
  });
  
  const handleAddToCart = async (productData) => {
    console.log('🛒 Intentando añadir al carrito:', productData);
    
    try {
      // La función addToCart ahora gestiona el carrito localmente
      const response = await addToCart(productData);
      console.log('📦 Respuesta:', response);
      
      if (response && typeof response.count === 'number') {
        setCartCount(response.count);
        alert(`✅ Producto añadido al carrito\nTotal de productos: ${response.count}`);
      } else {
        throw new Error('Respuesta inválida');
      }
      
    } catch (error) {
      console.error('❌ Error al añadir al carrito:', error);
      alert(`❌ Error al añadir el producto al carrito\n\nDetalle: ${error.message}`);
    }
  };
  
  return (
    <Router>
      {({ currentPath, navigate }) => {
        const productMatch = currentPath.match(/#\/product\/([a-zA-Z0-9_-]+)/);
        const productId = productMatch ? productMatch[1] : null;
        
        return (
          <div className="min-h-screen bg-gray-100">
            <Header cartCount={cartCount} onCartCountChange={setCartCount} />
            
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