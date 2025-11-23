import React, { useEffect, useState } from 'react';

function PageTransition({ children, className = '' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // small timeout so the initial render has the 'before' styles
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`page-transition ${visible ? 'enter' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
}

export default PageTransition;
