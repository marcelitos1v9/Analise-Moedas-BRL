import React from 'react';

interface Acao {
  shortName: string;
  longName: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  symbol: string;
  logourl: string;
}

interface ModalAcaoProps {
  acao: Acao;
  onClose: () => void;
}

const ModalAcao: React.FC<ModalAcaoProps> = ({ acao, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{acao.shortName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <img src={acao.logourl} alt={acao.shortName} className="w-16 h-16 mb-4" />
        <p className="mb-2"><strong>Nome:</strong> {acao.longName}</p>
        <p className="mb-2"><strong>Símbolo:</strong> {acao.symbol}</p>
        <p className="mb-2"><strong>Preço:</strong> R$ {acao.regularMarketPrice.toFixed(2)}</p>
        <p className={`mb-2 ${acao.regularMarketChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <strong>Variação:</strong> {acao.regularMarketChangePercent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default ModalAcao;