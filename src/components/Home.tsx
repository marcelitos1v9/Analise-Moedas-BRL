import React from 'react';
import GraficoReal from './Grafico_real';
import PrincipaisMoedas from './Principais_moedas';
import PrincipaisAcoes from './PrincipaisAcoes';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Bem-vindo ao FinançasFácil</h1>
        <p className="mb-4 text-center">Simplificando suas finanças, um passo de cada vez.</p>
        <GraficoReal />
        <PrincipaisMoedas />
        <PrincipaisAcoes />
      </main>
    </div>
  );
};

export default Home;
