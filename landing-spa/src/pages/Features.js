import React from 'react';
import PageTransition from '../components/PageTransition/PageTransition';

// 1. Importa la imagen principal de la sección
import laptopDestacada from '../assets/images/laptop-destacada.png';

// 2. Importa todos los iconos de la lista
import iconProcesador from '../assets/images/iconos/procesador.svg';
import iconPantalla from '../assets/images/iconos/pantalla.svg';
import iconAlmacenamiento from '../assets/images/iconos/almacenamiento.svg';
import iconBateria from '../assets/images/iconos/bateria.svg';
import iconTeclado from '../assets/images/iconos/teclado.svg';

function Features() {
  return (
    <PageTransition>
      <section className="features" id="features">
        <div className="container features-content">
          
          <div className="features-image">
            {/* 3. Usa la imagen principal importada */}
            <img src={laptopDestacada} alt="Laptop en diferentes entornos" />
          </div>

          <div className="features-list">
            <h2>Potencia y rendimiento que se adaptan a ti</h2>
            <ul>
              <li>
                {/* 4. Usa los iconos importados */}
                <img src={iconProcesador} alt="Icono de Procesador" />
                <strong>Procesador:</strong> Intel i7 / AMD Ryzen 7 de última generación
              </li>
              <li>
                <img src={iconPantalla} alt="Icono de Pantalla" />
                <strong>Pantalla:</strong> Full HD / Retina con tecnología antirreflejo
              </li>
              <li>
                <img src={iconAlmacenamiento} alt="Icono de Almacenamiento" />
                <strong>Almacenamiento:</strong> SSD de hasta 1TB para velocidad y espacio
              </li>
              <li>
                <img src={iconBateria} alt="Icono de Batería" />
                <strong>Batería:</strong> Hasta 12 horas de uso continuo
              </li>
              <li>
                <img src={iconTeclado} alt="Icono de Teclado" />
                <strong>Teclado:</strong> Retroiluminado y touchpad de precisión
              </li>
            </ul>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}

export default Features;