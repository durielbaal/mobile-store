import cacheManager from './cache';

const API_BASE = 'https://itx-frontend-test.onrender.com/api';

export const getProducts = async () => {
  const cached = cacheManager.get('products');
  if (cached) {
    console.log('✅ Usando productos desde caché');
    return cached;
  }
  
  console.log('📡 Obteniendo productos desde API');
  
  try {
    const response = await fetch(`${API_BASE}/product`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    cacheManager.set('products', data);
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo productos:', error);
    throw error;
  }
};

export const getProduct = async (id) => {
  const cached = cacheManager.get(`product-${id}`);
  if (cached) {
    console.log(`✅ Usando producto ${id} desde caché`);
    return cached;
  }
  
  console.log(`📡 Obteniendo producto ${id} desde API`);
  
  try {
    const response = await fetch(`${API_BASE}/product/${id}`);
    
    console.log(`📊 Status de respuesta para ${id}:`, response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error response para ${id}:`, errorText);
      throw new Error(`Error ${response.status}: Producto no encontrado`);
    }
    
    const data = await response.json();
    console.log(`✅ Producto ${id} obtenido:`, data);
    
    cacheManager.set(`product-${id}`, data);
    return data;
  } catch (error) {
    console.error(`❌ Error obteniendo producto ${id}:`, error);
    throw error;
  }
};

// Gestión del carrito en cliente debido a limitaciones de CORS del backend
export const addToCart = async (productData) => {
  console.log('🛒 Añadiendo producto al carrito:', productData);
  
  try {
    // Intentamos hacer la petición al backend (aunque no mantendrá sesión)
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });
    
    console.log('📊 Status de respuesta del carrito:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response del carrito:', errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Respuesta del carrito (sin sesión persistente):', data);
    
    // IMPORTANTE: Como el backend no mantiene sesión, gestionamos el contador localmente
    // Obtenemos el carrito actual del localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Añadimos el nuevo producto al carrito
    cart.push({
      ...productData,
      addedAt: Date.now()
    });
    
    // Guardamos el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Retornamos el count real basado en nuestro carrito local
    return {
      count: cart.length,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error en addToCart:', error);
    throw error;
  }
};

// Nueva función para obtener el carrito actual
export const getCartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
  } catch (error) {
    console.error('Error obteniendo carrito:', error);
    return 0;
  }
};

// Nueva función para limpiar el carrito
export const clearCart = () => {
  localStorage.removeItem('cart');
  return 0;
};