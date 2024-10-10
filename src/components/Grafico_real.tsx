import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraficoReal: React.FC = () => {
  const [dadosGrafico, setDadosGrafico] = useState<{ labels: string[]; datasets: { label: string; data: number[]; fill: boolean; borderColor: string; tension: number }[] } | null>(null);

  useEffect(() => {
    const buscarDadosReal = async () => {
      try {
        const resposta = await fetch('https://economia.awesomeapi.com.br/json/daily/USD-BRL/30');
        const dados = await resposta.json();

        const datas = dados.map((item: any) => {
          const data = new Date(item.timestamp * 1000);
          return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
        });
        const valores = dados.map((item: any) => parseFloat(item.bid));

        setDadosGrafico({
          labels: datas,
          datasets: [
            {
              label: 'Cotação do Real em relação ao Dólar',
              data: valores,
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.4
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
        labels: {
          font: {
            size: 14,
            weight: 'bold' as const
          }
        }
      },
      title: {
        display: true,
        text: 'Variação do Real nos últimos 30 dias',
        font: {
          size: 18,
          weight: 'bold' as const
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      x: {
        reverse: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Gráfico do Real</h2>
      {dadosGrafico ? (
        <Line data={dadosGrafico} options={opcoes} />
      ) : (
        <p className="text-center text-gray-600">Carregando dados...</p>
      )}
    </div>
  );
};

export default GraficoReal;
