
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalFooter: React.FC = () => {
  const navigate = useNavigate();
  return (
  <footer className="bg-ruangTemu border-t border-[#F4E4C1] mt-16 mb-20 lg:mb-0">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid md:grid-cols-4 gap-8 mb-4">

           {/* Logo & Info */}
           <div>
             <div className="flex items-center gap-3 mb-4">
               <img
                 src="/assets/img/logo-fix.png"
                 alt="Ruang Temu Logo"
                 className="h-10 w-10"
               />
               <span className="font-dancingScript text-3xl bg-mainColor font-bold bg-clip-text text-transparent">
                 Ruang Temu
               </span>
             </div>
             <div className="footer-info text-gray-600 text-xs space-y-1.5">
               <p>Copyright © Kelompok 4 (Fantastic) LA79</p>
               <p>Universitas Bina Nusantara</p>
               <p>Jl. Kebon Jeruk Raya No. 27, Kebon Jeruk Jakarta Barat 11530, Indonesia</p>
             </div>
           </div>

           {/* Layanan */}
           <div>
             <h4 className="mb-4 text-[#D4AF37] font-semibold">Layanan</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li><a onClick={() => navigate("/eksplor")} href="#" className="hover:text-[#D4AF37] transition-colors">Cari Venue</a></li>
               <li><a onClick={() => navigate("/negosiasi")} href="#" className="hover:text-[#D4AF37] transition-colors">Kontrak Digital</a></li>
               <li><a onClick={() => navigate("/estimator")} href="#" className="hover:text-[#D4AF37] transition-colors">Budget Estimator</a></li>
               <li><a onClick={() => navigate("/review")} href="#" className="hover:text-[#D4AF37] transition-colors">Review Terpercaya</a></li>
             </ul>
           </div>

           {/* Untuk Vendor */}
           <div>
             <h4 className="mb-4 text-[#D4AF37] font-semibold">Untuk Vendor</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Daftar Venue</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Highlight Ads</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Banner Ads</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Analytics</a></li>
             </ul>
           </div>

           {/* Bantuan */}
           <div>
             <h4 className="mb-4 text-[#D4AF37] font-semibold">Bantuan</h4>
             <ul className="space-y-2 text-sm text-gray-600">
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Pusat Bantuan</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">FAQ</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Syarat & Ketentuan</a></li>
               <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Kebijakan Privasi</a></li>
             </ul>
           </div>

         </div>

         {/* Footer Bottom */}
         <div className="border-t border-[#F4E4C1] mt-10 pt-8 text-center">
           <p className="text-sm text-gray-600 leading-relaxed mt-4">
             © 2025 Ruang Temu. All rights reserved. Made with ❤️ for couples in Indonesia.
           </p>
         </div>
       </div>
     </footer>

       );
};

export default OriginalFooter;