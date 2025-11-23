import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import PageTransition from '../components/PageTransition/PageTransition';

// Importa imágenes reales desde assets
import imgProd1 from '../assets/images/producto-1.png';
import imgProd2 from '../assets/images/producto-2.png';
import imgProd3 from '../assets/images/producto-3.png';

function Products() {
  return (
    <PageTransition>
      <section className="products" id="products">
        <div className="container">
          <h2>Productos Destacados</h2>
          <div className="product-grid">
            
            <ProductCard 
              imagenSrc={imgProd1}
              altText="Laptop Ultra"
              titulo="Laptop Ultra Max"
              precio="$1,299.00"
            />
            
            <ProductCard 
              imagenSrc={imgProd2}
              altText="Laptop Pro"
              titulo="Laptop Pro 5G"
              precio="$1,599.00"
            />

            <ProductCard 
              imagenSrc={imgProd3}
              altText="Laptop Gaming"
              titulo="Laptop Gaming X"
              precio="$1,899.00"
            />

          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Products;