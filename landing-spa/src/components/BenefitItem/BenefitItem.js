import React from 'react';

function BenefitItem({ iconSrc, altText, titulo, descripcion }) {
  return (
    <div className="benefit-item">
      <div className="icon">
        <img src={iconSrc} alt={altText} />
      </div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
}

export default BenefitItem;