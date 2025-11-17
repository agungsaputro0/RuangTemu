import React from 'react';

const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/assets/img/logo-long.png" 
        alt="Logo Ruang Temu"
        width={240}
        height={60}
        className="ml-1 mb-2"
      />
    </div>
  );
};

export default Logo;
