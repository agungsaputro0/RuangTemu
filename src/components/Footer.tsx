import React from 'react';
import Logo from './Logo';
import SocialIcon from './SocialIcon';
import FooterInfo from './FootersInfo';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/UseIsMobile';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
    const navigate = useNavigate();
  return (

    <footer className={`mt-auto footer bg-ruangTemu text-white ${isMobile ? "pb-20" : ""}`}>
    <div className="bg-mainColor py-2 text-center">
        <ul className="flex items-center justify-center space-x-6 gap-8 text-sm text-white mr-[10px] ml-[10px]">
        {/* <ul className="flex justify-center space-x-6 text-sm text-white sm:space-x-4 sm:flex-col xs:items-center"> */}
        <li><a href="#" className="hover:text-mainColorLite hover:font-bold">Pusat Bantuan</a></li>
        <li><a href="#" className="hover:text-mainColorLite hover:font-bold">FAQ</a></li>
        <li><a href="#" className="hover:text-mainColorLite hover:font-bold">Syarat & Ketentuan</a></li>
        <li><a href="#" className="hover:text-mainColorLite hover:font-bold">Kebijakan Privasi</a></li>
        </ul>
    </div>

    <div className="container mt-2 mx-auto py-4 flex flex-col lg:flex-row lg:justify-between md:flex-row md:justify-between">
        <div className="footer-left mb-8 lg:text-left md:text-left ml-5 sm:ml-5 mt-[2px]">
        <Logo />
        <FooterInfo />
        </div>
        <div className="footer-right text-rajutGray sm:footer-left mb-8 mt-4 lg:mt-0 ml-7 text-left lg:text-left md:text-left mt-[2px]">
            <h4 className="text-mainColor mb-2"><b>Layanan</b></h4>
            <ul className="space-y-2 text-sm text-gray-600">
               <li><a onClick={() => navigate("/eksplor")} href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Cari Venue</a></li>
               <li><a onClick={() => navigate("/negosiasi")} href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Kontrak Digital</a></li>
               <li><a onClick={() => navigate("/estimator")} href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Budget Estimator</a></li>
               <li><a onClick={() => navigate("/review")} href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Review Terpercaya</a></li>
             </ul>
        </div>
        <div className="footer-right text-rajutGray sm:footer-left mb-8 mt-4 lg:mt-0 ml-7 text-left lg:text-left md:text-left mt-[2px]">
            <h4 className="text-mainColor mb-2"><b>Untuk Vendor</b></h4>
            <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Daftar Venue</a></li>
                <li><a href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Highlight Ads</a></li>
                <li><a href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Banner Ads</a></li>
                <li><a href="#" className="hover:text-secondColor hover:font-semibold transition-colors">Analytics</a></li>
            </ul>
        </div>
        <div className="footer-right mb-8 mt-4 lg:mt-0 md:mr-10 sm:mr-5 ml-7 mt-[2px]">
        <h4 className="mb-2 text-mainColor"><b>Follow Us</b></h4>
        <SocialIcon />
        </div>
    </div>
    </footer>

  );
};

export default Footer;
