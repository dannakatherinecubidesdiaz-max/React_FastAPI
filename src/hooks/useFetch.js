import { useState, useEffect, useCallback } from 'react';

// Hook genérico para consumir endpoints de la API de Spring Boot.
// Devuelve { datos, cargando, error, refetch }.
// Ejemplo: const { datos: servicios, cargando } = useFetch(servicioApi.listar);
export default function useFetch(fn, dependencias = []) {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(() => {
    setCargando(true);
    setError(null);
    fn()
      .then((res) => setDatos(res.data))
      .catch((err) => setError(err))
      .finally(() => setCargando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { datos, cargando, error, refetch };
}