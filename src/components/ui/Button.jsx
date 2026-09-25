// Botón reutilizable: estilos según su variante con valores por defecto.
export default function Button({
  children,
  variant = 'primario',
  size = 'md',
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-loading">
          <span className="spinner" aria-hidden="true"></span>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}