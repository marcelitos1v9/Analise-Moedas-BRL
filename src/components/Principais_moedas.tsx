import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import dynamic from 'next/dynamic';


const ModalMoeda = dynamic(() => import('./ModalMoeda'), { ssr: false });

const PrincipaisMoedas: React.FC = () => {
  const [dadosMoedas, setDadosMoedas] = useState<any>(null);
  const [moedaSelecionada, setMoedaSelecionada] = useState<string | null>(null);

  useEffect(() => {
    const buscarDadosMoedas = async () => {
      try {
        const resposta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,CHF-BRL,CAD-BRL,AUD-BRL,CNY-BRL,MXN-BRL,ARS-BRL');
        const dados = await resposta.json();
        setDadosMoedas(dados);
      } catch (erro) {
        console.error('Erro ao buscar dados das moedas:', erro);
      }
    };

    buscarDadosMoedas();
    const intervalo = setInterval(buscarDadosMoedas, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(intervalo);
  }, []);

  const moedas = [
    { sigla: 'USD', nome: 'Dólar Americano', codigoPais: 'US' },
    { sigla: 'EUR', nome: 'Euro', codigoPais: 'EU' },
    { sigla: 'GBP', nome: 'Libra Esterlina', codigoPais: 'GB' },
    { sigla: 'JPY', nome: 'Iene Japonês', codigoPais: 'JP' },
    { sigla: 'CHF', nome: 'Franco Suíço', codigoPais: 'CH' },
    { sigla: 'CAD', nome: 'Dólar Canadense', codigoPais: 'CA' },
    { sigla: 'AUD', nome: 'Dólar Australiano', codigoPais: 'AU' },
    { sigla: 'CNY', nome: 'Yuan Chinês', codigoPais: 'CN' },
    { sigla: 'MXN', nome: 'Peso Mexicano', codigoPais: 'MX' },
    { sigla: 'ARS', nome: 'Peso Argentino', codigoPais: 'AR' }
  ];

  const abrirModal = (sigla: string) => {
    setMoedaSelecionada(sigla);
  };

  const fecharModal = () => {
    setMoedaSelecionada(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 text-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-center">Comparação do Real com Principais Moedas</h2>
      {dadosMoedas ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {moedas.map((moeda) => {
            const dadoMoeda = dadosMoedas[`${moeda.sigla}BRL`];
            const variacao = parseFloat(dadoMoeda.pctChange); // Variação percentual
            const corVariacao = variacao >= 0 ? 'text-green-500' : 'text-red-500';
            return (
              <div 
                key={moeda.sigla} 
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105" 
                onClick={() => abrirModal(moeda.sigla)}
              >
                <div className="flex items-center justify-between mb-2">
                  <img
                    src={`https://flagcdn.com/w20/${moeda.codigoPais.toLowerCase()}.png`}
                    alt={`Bandeira ${moeda.nome}`}
                    width={20}
                    height={15}
                  />
                  <span className="font-bold">{moeda.sigla}</span>
                </div>
                <p className="text-sm mb-1">{moeda.nome}</p>
                <p className="text-lg font-semibold mb-1">R$ {parseFloat(dadoMoeda.bid).toFixed(2)}</p>
                <div className={`flex items-center ${corVariacao}`}>
                  {variacao >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  <span className="ml-1">{Math.abs(variacao).toFixed(2)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">Carregando dados...</p>
      )}
      {moedaSelecionada && (
        <ModalMoeda
          moeda={moedaSelecionada}
          dadosMoeda={dadosMoedas[`${moedaSelecionada}BRL`]}
          onClose={fecharModal}
        />
      )}
    </div>
  );
};

export default PrincipaisMoedas;
