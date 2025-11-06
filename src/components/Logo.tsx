import React from 'react';

const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/assets/img/logo-fix.png" 
        alt="Logo Ruang Temu"
        width={60}
        height={60}
        className="ml-1"
      />
      <div>
        <h3><b><span className="text-mainColor font-dancingScript text-4xl">Ruang Temu</span></b></h3>
      </div>
    </div>
  );
};

export default Logo;
