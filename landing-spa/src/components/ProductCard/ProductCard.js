import React from 'react';
// Importa la imagen (aunque es mejor pasarla como prop)

function ProductCard({ imagenSrc, altText, titulo, precio }) {
  return (
    <div className="product-card">
      <img src={imagenSrc} alt={altText} />
      <h3>{titulo}</h3>
      <p className="price">{precio}</p>
      {/* Usamos 'a' aquí, pero podría ser un Link si lleva a una pág. de detalle */}
      <a href="#" className="btn btn-primary">Comprar</a>
    </div>
  );
}

export default ProductCard;