import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Line } from 'react-chartjs-2'; // Importando o gráfico

interface ModalMoedaProps {
  moeda: string;
  dadosMoeda: any;
  onClose: () => void;
}

const ModalMoeda: React.FC<ModalMoedaProps> = ({ moeda, dadosMoeda, onClose }) => {
  const [historico, setHistorico] = useState<any[]>([]);
  const variacao = parseFloat(dadosMoeda.varBid);
  const corVariacao = variacao >= 0 ? 'text-green-500' : 'text-red-500';

  const nomeMoedas: { [key: string]: string } = {
    USD: 'Dólar Americano',
    EUR: 'Euro',
    GBP: 'Libra Esterlina',
    JPY: 'Iene Japonês',
    CHF: 'Franco Suíço',
    CAD: 'Dólar Canadense',
    AUD: 'Dólar Australiano',
    CNY: 'Yuan Chinês'
  };

  const codigosPais: { [key: string]: string } = {
    USD: 'US',
    EUR: 'EU',
    GBP: 'GB',
    JPY: 'JP',
    CHF: 'CH',
    CAD: 'CA',
    AUD: 'AU',
    CNY: 'CN'
  };

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const resposta = await fetch(`https://economia.awesomeapi.com.br/json/daily/${moeda}-BRL/30`); // Alterado para 30 dias
        const dados = await resposta.json();
        setHistorico(dados);
      } catch (erro) {
        console.error('Erro ao buscar histórico:', erro);
      }
    };

    buscarHistorico();
  }, [moeda]);

  // Preparando dados para o gráfico
  const labels = historico && historico.length > 0 ? historico.map((data: any) => new Date(data.timestamp * 1000).toLocaleDateString()) : [];
  const valores = historico && historico.length > 0 ? historico.map((data: any) => parseFloat(data.bid)) : [];

  const dataGrafico = {
    labels: labels,
    datasets: [
      {
        label: `Preço de ${moeda} nos últimos 30 dias`, // Alterado para 30 dias
        data: valores,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
        tension: 0.1
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-xl w-full"> {/* Reduzido o tamanho do modal */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img
              src={`https://flagcdn.com/w40/${codigosPais[moeda].toLowerCase()}.png`}
              alt={`Bandeira ${nomeMoedas[moeda]}`}
              width={32}
              height={24}
              className="mr-2"
            />
            <h2 className="text-xl font-bold">{moeda}/BRL - {nomeMoedas[moeda]}</h2>
          </div>
        </div>
        <div className="mb-3 grid grid-cols-2 gap-3">
          <p className="text-base">
            <span className="font-semibold">Compra:</span> R$ {parseFloat(dadosMoeda.bid).toFixed(4)}
          </p>
          <p className="text-base">
            <span className="font-semibold">Venda:</span> R$ {parseFloat(dadosMoeda.ask).toFixed(4)}
          </p>
          <p className="text-base">
            <span className="font-semibold">Máxima:</span> R$ {parseFloat(dadosMoeda.high).toFixed(4)}
          </p>
          <p className="text-base">
            <span className="font-semibold">Mínima:</span> R$ {parseFloat(dadosMoeda.low).toFixed(4)}
          </p>
          <p className={`text-base ${corVariacao} flex items-center`}>
            <span className="font-semibold mr-1">Variação:</span>
            {variacao >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            {Math.abs(variacao).toFixed(2)}%
          </p>
          <p className="text-base">
            <span className="font-semibold">Volume:</span> {parseInt(dadosMoeda.volume).toLocaleString()}
          </p>
        </div>
        <div className="mb-3">
          <p className="text-base">
            <span className="font-semibold">Cotação para 1 {moeda}:</span> R$ {parseFloat(dadosMoeda.bid).toFixed(4)}
          </p>
          <p className="text-base">
            <span className="font-semibold">Cotação para 1 BRL:</span> {(1 / parseFloat(dadosMoeda.bid)).toFixed(4)} {moeda}
          </p>
        </div>
        <div className="mb-3">
          <h3 className="text-base font-semibold">Análise dos Últimos 30 Dias</h3> {/* Alterado para 30 dias */}
          <Line data={dataGrafico} />
        </div>
        <p className="text-xs text-gray-600">
          Última atualização: {new Date(dadosMoeda.timestamp * 1000).toLocaleString()}
        </p>
        <button
          onClick={onClose}
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalMoeda;
