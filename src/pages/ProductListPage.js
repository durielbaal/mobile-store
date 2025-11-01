import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ProductItem from '../components/ProductItem';
import { getProducts } from '../services/api';

const ProductListPage = ({ navigate }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase();
    return product.brand.toLowerCase().includes(search) || 
           product.model.toLowerCase().includes(search);
  });
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Cargando productos...</div>
      </div>
    );
  }
  
  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={() => navigate(`#/product/${product.id}`)}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron productos que coincidan con "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default ProductListPage;