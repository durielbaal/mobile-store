import cacheManager from './cache';

const API_BASE = 'https://itx-frontend-test.onrender.com/api';

export const getProducts = async () => {
  const cached = cacheManager.get('products');
  if (cached) {
    console.log('✅ Usando productos desde caché');
    return cached;
  }
  
  console.log('📡 Obteniendo productos desde API');
  const response = await fetch(`${API_BASE}/product`);
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  cacheManager.set('products', data);
  return data;
};

export const getProduct = async (id) => {
  const cached = cacheManager.get(`product-${id}`);
  if (cached) {
    console.log(`✅ Usando producto ${id} desde caché`);
    return cached;
  }
  
  console.log(`📡 Obteniendo producto ${id} desde API`);
  const response = await fetch(`${API_BASE}/product/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  cacheManager.set(`product-${id}`, data);
  return data;
};

export const addToCart = async (productData) => {
  console.log('🛒 Añadiendo producto al carrito:', productData);
  
  const response = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Error response:', errorText);
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('✅ Respuesta del carrito:', data);
  
  // Verificar que la respuesta tiene el formato esperado
  if (typeof data.count === 'undefined') {
    console.warn('⚠️ La respuesta no contiene "count":', data);
    // Si la API no devuelve count, incrementamos manualmente
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0', 10);
    return { count: currentCount + 1 };
  }
  
  return data;
};