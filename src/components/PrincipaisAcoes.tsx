import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const ModalAcao = dynamic(() => import('./ModalAcao'), { ssr: false });

interface Acao {
  shortName: string;
  longName: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  symbol: string;
  logourl: string;
}

const PrincipaisAcoes: React.FC = () => {
  const [acoes, setAcoes] = useState<Acao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [acaoSelecionada, setAcaoSelecionada] = useState<string | null>(null);

  useEffect(() => {
    const buscarAcoes = async () => {
      const simbolos = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'ABEV3', 'BBAS3', 'MGLU3', 'WEGE3', 'RENT3', 'MELI34'];
      try {
        const token = process.env.NEXT_PUBLIC_BRAPI_TOKEN;
        if (!token) {
          throw new Error('Token da API não encontrado');
        }
        const respostas = await Promise.all(
          simbolos.map(simbolo =>
            axios.get(`https://brapi.dev/api/quote/${simbolo}?token=${token}`)
          )
        );
        const dadosAcoes = respostas.map((resposta: { data: { results: any[] } }) => resposta.data.results[0]);
        setAcoes(dadosAcoes);
        setCarregando(false);
      } catch (erro) {
        console.error('Erro ao buscar dados das ações:', erro);
        setErro('Falha ao carregar os dados das ações. Por favor, tente novamente mais tarde.');
        setCarregando(false);
      }
    };

    buscarAcoes();
  }, []);

  const abrirModal = (simbolo: string) => {
    setAcaoSelecionada(simbolo);
  };

  const fecharModal = () => {
    setAcaoSelecionada(null);
  };

  if (carregando) {
    return <div className="text-center">Carregando...</div>;
  }

  if (erro) {
    return <div className="text-center text-red-500">{erro}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 text-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-center">Principais Ações</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {acoes.map((acao) => {
          const variacao = acao.regularMarketChangePercent;
          const corVariacao = variacao >= 0 ? 'text-green-500' : 'text-red-500';
          return (
            <div
              key={acao.symbol}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
              onClick={() => abrirModal(acao.symbol)}
            >
              <div className="flex items-center justify-between mb-2">
                <img src={acao.logourl} alt={acao.shortName} className="w-8 h-8" />
                <span className="font-bold">{acao.symbol}</span>
              </div>
              <p className="text-sm mb-1">{acao.shortName}</p>
              <p className="text-lg font-semibold mb-1">R$ {acao.regularMarketPrice.toFixed(2)}</p>
              <div className={`flex items-center ${corVariacao}`}>
                {variacao >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                <span className="ml-1">{Math.abs(variacao).toFixed(2)}%</span>
              </div>
            </div>
          );
        })}
      </div>
      {acaoSelecionada && (
        <ModalAcao
          acao={acoes.find(a => a.symbol === acaoSelecionada)!}
          onClose={fecharModal}
        />
      )}
    </div>
  );
};

export default PrincipaisAcoes;
