const CACHE_DURATION = 60 * 60 * 1000; // 1 hora en milisegundos

const cacheManager = {
  set: (key, data) => {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  },
  
  get: (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    try {
      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;
      
      if (isExpired) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error parsing cache:', error);
      localStorage.removeItem(key);
      return null;
    }
  },
  
  clear: () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('product')) {
        localStorage.removeItem(key);
      }
    });
  }
};

export default cacheManager;