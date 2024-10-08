import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">FinançasFácil</h3>
            <p className="text-sm">Simplificando suas finanças, um passo de cada vez.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Links Rápidos</h4>
            <ul className="text-sm">
              <li><a href="#" className="hover:text-blue-400">Início</a></li>
              <li><a href="#" className="hover:text-blue-400">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-blue-400">Serviços</a></li>
              <li><a href="#" className="hover:text-blue-400">Contato</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-400"><FaFacebook /></a>
              <a href="#" className="text-2xl hover:text-blue-400"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-blue-400"><FaInstagram /></a>
              <a href="#" className="text-2xl hover:text-blue-400"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; 2023 FinançasFácil. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Criado por Marcelo Augusto</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
