import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraficoReal: React.FC = () => {
  const [dadosGrafico, setDadosGrafico] = useState<any>(null);

  useEffect(() => {
    const buscarDadosReal = async () => {
      try {
        const resposta = await fetch('https://economia.awesomeapi.com.br/json/daily/USD-BRL/30');
        const dados = await resposta.json();

        const datas = dados.map((item: any) => new Date(item.timestamp * 1000).toLocaleDateString('pt-BR'));
        const valores = dados.map((item: any) => parseFloat(item.bid));

        setDadosGrafico({
          labels: datas.reverse(),
          datasets: [
            {
              label: 'Cotação do Real em relação ao Dólar',
              data: valores.reverse(),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
      } catch (erro) {
        console.error('Erro ao buscar dados do Real:', erro);
      }
    };

    buscarDadosReal();
  }, []);

  const opcoes = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Variação do Real nos últimos 30 dias'
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Gráfico do Real</h2>
      {dadosGrafico ? (
        <Line data={dadosGrafico} options={opcoes} />
      ) : (
        <p className="text-center">Carregando dados...</p>
      )}
    </div>
  );
};

export default GraficoReal;
