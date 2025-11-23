import React from 'react';
import BenefitItem from '../components/BenefitItem/BenefitItem';
import PageTransition from '../components/PageTransition/PageTransition';

// 1. Importa los iconos que vas a necesitar
import iconEnvio from '../assets/images/iconos/envio-rapido.svg';
import iconGarantia from '../assets/images/iconos/garantia.svg';
import iconSoporte from '../assets/images/iconos/soporte.svg';
import iconPago from '../assets/images/iconos/pago-seguro.svg';

function Benefits() {
  return (
    <PageTransition>
      <section className="benefits" id="benefits">
        <div className="container">
          <h2>Nuestros Beneficios</h2>
          <div className="benefits-grid">
            
            {/* 2. Usa el componente reutilizable */}
            <BenefitItem 
              iconSrc={iconEnvio}
              altText="Icono de Envío Rápido"
              titulo="Envío Rápido"
              descripcion="Recibe tu laptop en tiempo récord, directamente en tu puerta."
            />
            
            <BenefitItem 
              iconSrc={iconGarantia}
              altText="Icono de Garantía"
              titulo="Garantía Extendida"
              descripcion="Protege tu inversión con nuestra garantía y cobertura de servicio."
            />

            <BenefitItem 
              iconSrc={iconSoporte}
              altText="Icono de Soporte"
              titulo="Soporte Técnico"
              descripcion="Acceso 24/7 a nuestro equipo de expertos para cualquier duda."
            />

            <BenefitItem 
              iconSrc={iconPago}
              altText="Icono de Pago Seguro"
              titulo="Pago Seguro"
              descripcion="Tus transacciones están protegidas con encriptación de última tecnología."
            />

          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Benefits;