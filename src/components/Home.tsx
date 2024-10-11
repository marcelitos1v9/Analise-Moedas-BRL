import React, { useState } from 'react';
import Header from './Header';
import GraficoReal from './Grafico_real';
import PrincipaisMoedas from './Principais_moedas';
import PrincipaisAcoes from './PrincipaisAcoes';
import Noticias from './Noticias'; // Importando o componente de notícias

const Home = () => {
  const [exibicao, setExibicao] = useState('noticias'); // Alterando para 'noticias' como padrão

  return (
    <div className="flex flex-col min-h-screen">
      <Header setExibicao={setExibicao} />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {/* <h1 className="text-3xl font-bold mb-4 text-center">Bem-vindo ao FinançasFácil</h1>
        <p className="mb-4 text-center">Simplificando suas finanças, um passo de cada vez.</p> */}
        {exibicao === 'moedas' ? (
          <>
            <GraficoReal />
            <PrincipaisMoedas />
          </>
        ) : exibicao === 'acoes' ? (
          <PrincipaisAcoes />
        ) : (
          <Noticias /> // Adicionando o componente de notícias
        )}
      </main>
    </div>
  );
};

export default Home;
