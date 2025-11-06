// components/molecules/FooterInfo.tsx
import React from 'react';
import useIsMobile from '../hooks/UseIsMobile';
const FooterInfo: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div className={`footer-info text-appGray text-[0.8em] mt-[0px] ${isMobile ? "ml-2 mr-4" : "ml-6"}`}>
      <p>Copyright © Group 4 BEC Market Validation - Kelas LA79</p>
      <p>Universitas Bina Nusantara - Ruang Temu</p>
      <p>Jl. Kebon Jeruk Raya No. 27, Kebon Jeruk Jakarta Barat 11530, Indonesia</p>
    </div>
  );
};

export default FooterInfo;
