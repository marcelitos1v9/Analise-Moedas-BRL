import React, { useState } from 'react';
import Link from 'next/link';
import { FaCoins, FaChartLine, FaHome } from 'react-icons/fa';

const Header: React.FC<{ setExibicao: (exibicao: string) => void }> = ({ setExibicao }) => {
  const [ativo, setAtivo] = useState('moedas');

  const handleClick = (exibicao: string) => {
    setExibicao(exibicao);
    setAtivo(exibicao);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 hover:text-blue-200 transition duration-300">
          <FaHome className="text-2xl" />
          <h1 className="text-3xl font-bold">FinançasFácil</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="#"
                onClick={() => handleClick('moedas')}
                className={`flex items-center space-x-2 py-2 px-4 rounded-full transition duration-300 ${
                  ativo === 'moedas' ? 'bg-white text-blue-600' : 'hover:bg-blue-500'
                }`}
              >
                <FaCoins />
                <span>Moedas</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={() => handleClick('acoes')}
                className={`flex items-center space-x-2 py-2 px-4 rounded-full transition duration-300 ${
                  ativo === 'acoes' ? 'bg-white text-blue-600' : 'hover:bg-blue-500'
                }`}
              >
                <FaChartLine />
                <span>Ações</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
