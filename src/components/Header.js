import { clearCart } from '../services/api';

const Header = ({ cartCount, onCartCountChange }) => {
  const currentPath = window.location.hash || '#/';
  const isProductDetail = currentPath.startsWith('#/product/');
  
  const handleReset = () => {
    if (window.confirm('¿Quieres vaciar el carrito?')) {
      const newCount = clearCart();
      onCartCountChange(newCount);
    }
  };
  
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="#/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">📱</span>
              </div>
              <h1 className="text-xl font-bold">Mobile Store</h1>
            </a>
          </div>
          
          <nav className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              {isProductDetail ? (
                <div className="flex items-center space-x-2">
                  <a href="#/" className="hover:text-white transition">Productos</a>
                  <span>/</span>
                  <span>Detalle</span>
                </div>
              ) : (
                <span>Productos</span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg">
                <span className="text-lg">🛒</span>
                <span className="font-semibold">{cartCount}</span>
              </div>
              
              {cartCount > 0 && (
                <button
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition text-sm"
                  title="Vaciar carrito"
                >
                  🗑️
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;