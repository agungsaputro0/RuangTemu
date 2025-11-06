// components/atoms/SocialIcon.tsx

import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialIcon: React.FC = () => {
  return (
    <div className="flex social-icons whitespace-nowrap">
      <FaFacebook className="cursor-pointer text-2xl mx-2 text-gray-600 hover:text-secondColor" />
      <FaInstagram className="cursor-pointer text-2xl mx-2 text-gray-600 hover:text-secondColor" />
      <FaTwitter className="cursor-pointer text-2xl mx-2 text-gray-600 hover:text-secondColor" />
      <FaYoutube className="cursor-pointer text-2xl mx-2 text-gray-600 hover:text-secondColor" />
    </div>
  );
};

export default SocialIcon;
