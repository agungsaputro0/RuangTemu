import React from 'react';
import Logo from '../atoms/Logo';
import SocialIcon from '../atoms/SocialIcon';
import FooterInfo from '../atoms/FootersInfo';
import { MailOutlined } from '@ant-design/icons';
import { FaWhatsapp } from 'react-icons/fa';
import useIsMobile from '../hooks/UseIsMobile';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  return (
<footer className={`mt-auto footer bg-fourthColor text-white ${isMobile ? "pb-10" : ""}`}>
  <div className="bg-mainColor py-2 text-center">
    <ul className="flex justify-center space-x-6 text-sm text-white mr-[10px] ml-[10px]">
    {/* <ul className="flex justify-center space-x-6 text-sm text-white sm:space-x-4 sm:flex-col xs:items-center"> */}
      <li><a href="#" className="hover:text-secondColor">Peta Situs</a></li>
      <li><a href="#" className="hover:text-secondColor">Hubungi Kami</a></li>
      <li><a href="#" className="hover:text-secondColor">Kebijakan Privasi</a></li>
      <li><a href="#" className="hover:text-secondColor">Syarat dan Ketentuan</a></li>
    </ul>
  </div>

  <div className="container mt-2 mx-auto py-4 flex flex-col lg:flex-row lg:justify-between md:flex-row md:justify-between">
    <div className="footer-left mb-8 lg:text-left md:text-left ml-5 sm:ml-5 mt-[2px]">
      <Logo />
      <FooterInfo />
    </div>
    <div className="footer-right text-rajutGray sm:footer-left mb-8 mt-4 lg:mt-0 ml-7 text-left lg:text-left md:text-left mt-[2px]">
      <h4 className="text-mainColor"><b>Contact Us</b></h4>
      <p className="mt-1"><MailOutlined /> &nbsp;<b>Email</b></p>
      <p><MailOutlined className="text-transparent md:hidden sm:contents lg:contents" /> &nbsp;rajut-dyubi@gmail.com</p>
      {/* Fax (React FA) */}
      <p className="mt-1 flex items-center gap-2">
        <FaWhatsapp className="text-[1.1em]" /><b>Whatsapp</b>
      </p>
      <p className="pl-6 cursor-pointer">087-666-999-212</p>
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
