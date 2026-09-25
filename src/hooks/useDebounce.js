import { useState, useEffect } from 'react';

// Retrasa la ejecución de una búsqueda hasta que el usuario deje de escribir.
// Ejemplo: buscarServicio(useDebounce(termino, 400))
export default function useDebounce(valor, retraso = 400) {
  const [debounced, setDebounced] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(valor), retraso);
    return () => clearTimeout(timer);
  }, [valor, retraso]);

  return debounced;
}