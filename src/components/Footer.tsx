import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 shadow-lg">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3">FinançasFácil</h3>
            <p className="text-base mb-4">Simplificando suas finanças, um passo de cada vez.</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.instagram.com/marceloaugusto_oo/" className="text-2xl hover:text-blue-300 transition duration-300">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/marcelo-augusto-oo" className="text-2xl hover:text-blue-300 transition duration-300">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4">Entre em Contato</h4>
            <Link href="mailto:contato@financasfacil.com" className="flex items-center justify-center md:justify-end space-x-2 hover:text-blue-300 transition duration-300">
              <FaEnvelope className="text-lg" />
              <span className="text-base">Marceloaugustocge@gmail.com</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-blue-600 text-center">
          <p className="text-sm">&copy; 2024 FinançasFácil. Todos os direitos reservados.</p>
          <p className="text-sm mt-1">Desenvolvido por Marcelo Augusto</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
