import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const servicesLinks = [
  { name: 'Bonus program', url: '#' },
  { name: 'Gift cards', url: '#' },
  { name: 'Credit and payment', url: '#' },
  { name: 'Service contracts', url: '#' },
  { name: 'Non-cash account', url: '#' },
  { name: 'Payment', url: '#' },
];

const assistanceLinks = [
  { name: 'Find an order', url: '#' },
  { name: 'Terms of delivery', url: '#' },
  { name: 'Exchange and return of goods', url: '#' },
  { name: 'Guarantee', url: '#' },
  { name: 'Frequently asked questions', url: '#' },
  { name: 'Terms of use of the site', url: '#' },
];

const socialLinks = [
  { icon: <FaXTwitter />, url: 'https://twitter.com/compassuol' },
  { icon: <FaFacebookF />, url: 'https://www.facebook.com/compass.uol' },
  { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/company/compass-uol' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/compass.uol' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121212] text-white py-12 px-6">
      <div className="container mx-auto flex flex-col items-center text-center gap-y-[32px]">
        <div className="flex flex-col items-center gap-y-[16px]">
          <h2 className="text-3xl font-bold tracking-wider text-white">cyber</h2>
          <p className="max-w-xs text-gray-400 text-[13px] font-normal leading-[24px]">
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col items-center">
            <h3 className="text-base font-semibold leading-4 mb-4 text-white">Services</h3>
            <ul className="flex flex-col gap-y-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} className="text-gray-400 hover:text-white transition-colors text-sm font-normal leading-8">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-base font-semibold leading-4 mb-4 text-white">Assistance to the buyer</h3>
            <ul className="flex flex-col gap-y-2">
              {assistanceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.url} className="text-gray-400 hover:text-white transition-colors text-sm font-normal leading-8">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-x-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:text-gray-400 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;