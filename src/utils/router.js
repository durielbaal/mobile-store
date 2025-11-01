import { useState, useEffect } from 'react';

const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const navigate = (path) => {
    window.location.hash = path;
  };
  
  return children({ currentPath, navigate });
};

export default Router;