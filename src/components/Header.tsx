import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [cotacoes, setCotacoes] = useState({
    dolar: 0,
    euro: 0,
    bitcoin: 0
  });

  useEffect(() => {
    const buscarCotacoes = async () => {
      try {
        const [respostaDolar, respostaEuro, respostaBitcoin] = await Promise.all([
          fetch('https://economia.awesomeapi.com.br/USD/1'),
          fetch('https://economia.awesomeapi.com.br/EUR/1'),
          fetch('https://economia.awesomeapi.com.br/BTC/1')
        ]);

        const [dadosDolar, dadosEuro, dadosBitcoin] = await Promise.all([
          respostaDolar.json(),
          respostaEuro.json(),
          respostaBitcoin.json()
        ]);

        setCotacoes({
          dolar: parseFloat(dadosDolar[0].bid),
          euro: parseFloat(dadosEuro[0].bid),
          bitcoin: parseFloat(dadosBitcoin[0].bid)
        });
      } catch (erro) {
        console.error('Erro ao buscar cotações:', erro);
      }
    };

    buscarCotacoes();
    // Atualiza as cotações a cada 5 minutos
    const intervalo = setInterval(buscarCotacoes, 300000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FinançasFácil</h1>
        <div className="flex space-x-4">
          <div>
            <span className="font-semibold">Dólar:</span> R$ {cotacoes.dolar.toFixed(2)}
          </div>
          <div>
            <span className="font-semibold">Euro:</span> R$ {cotacoes.euro.toFixed(2)}
          </div>
          <div>
            <span className="font-semibold">Bitcoin:</span> R$ {cotacoes.bitcoin.toFixed(2)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
