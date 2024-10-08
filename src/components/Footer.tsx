import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-16"> {/* Aumentei o padding vertical para separar mais */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="w-full mb-8 text-center"> {/* Aumentei a margem inferior para mais separação */}
            <h3 className="text-xl font-bold mb-2">FinançasFácil</h3>
            <p className="text-sm">Simplificando suas finanças, um passo de cada vez.</p>
          </div>
          <div className="w-full mb-8 text-center"> {/* Aumentei a margem inferior para mais separação */}
            <h4 className="text-lg font-semibold mb-2">Links Rápidos</h4>
            <ul className="text-sm flex justify-center space-x-4">
              <li><a href="#" className="hover:text-blue-400">Início</a></li>
              <li><a href="#" className="hover:text-blue-400">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-blue-400">Serviços</a></li>
              <li><a href="#" className="hover:text-blue-400">Contato</a></li>
            </ul>
          </div>
          <div className="w-full text-center">
            <h4 className="text-lg font-semibold mb-2">Siga-nos</h4>
            <div className="flex justify-center space-x-4">
              <a href="https://www.instagram.com/marceloaugusto_oo/" className="text-2xl hover:text-blue-400"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/marcelo-augusto-oo" className="text-2xl hover:text-blue-400"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center"> {/* Aumentei a margem superior para mais separação */}
          <p className="text-sm">&copy; 2023 FinançasFácil. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Criado por Marcelo Augusto</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
