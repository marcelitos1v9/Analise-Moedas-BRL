import React, { useState } from 'react';
import Link from 'next/link';
import { FaCoins, FaChartLine, FaHome, FaBars, FaNewspaper } from 'react-icons/fa'; // Importando ícone de jornal

const Header: React.FC<{ setExibicao: (exibicao: string) => void }> = ({ setExibicao }) => {
  const [ativo, setAtivo] = useState('noticias'); // Alterado para 'noticias' como padrão
  const [menuAberto, setMenuAberto] = useState(false);

  const handleClick = (exibicao: string) => {
    setExibicao(exibicao);
    setAtivo(exibicao);
    setMenuAberto(false);
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 md:p-6 shadow-lg">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 hover:text-blue-200 transition duration-300">
          <FaHome className="text-2xl" />
          <h1 className="text-2xl md:text-3xl font-bold">FinançasFácil</h1>
        </Link>
        <button onClick={toggleMenu} className="md:hidden text-2xl">
          <FaBars />
        </button>
        <nav className={`w-full md:w-auto ${menuAberto ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <Link
                href="#"
                onClick={() => handleClick('noticias')} // Novo link para notícias
                className={`flex items-center space-x-2 py-2 px-4 rounded-full transition duration-300 ${
                  ativo === 'noticias' ? 'bg-white text-blue-600' : 'hover:bg-blue-500'
                }`}
              >
                <FaNewspaper /> {/* Adicionando o ícone de jornal */}
                <span>Notícias</span> {/* Adicionando o texto para o novo link */}
              </Link>
            </li>
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
  )
};
export default Header;