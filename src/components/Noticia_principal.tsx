import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const NoticiaPrincipal: React.FC = () => {
  const [noticia, setNoticia] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarNoticia = async () => {
      try {
        // A chave da API é acessada através de variáveis de ambiente
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API || '';
        if (!apiKey) {
          throw new Error('Token da API não encontrado');
        } // Certifique-se de que esta variável está definida no .env.local e nas configurações da Vercel

        
        // Fazendo a requisição para a API
        const resposta = await axios.get(`https://newsapi.org/v2/everything?q=mercado+financeiro+brasil&apiKey=${apiKey}`);
        
        // Verificando se a resposta contém artigos
        if (resposta.data.articles.length === 0) {
          throw new Error('Nenhuma notícia encontrada.');
        }

        const dados = resposta.data.articles[0]; // Pega a primeira notícia
        setNoticia(dados);
        setCarregando(false);
      } catch (erro) {
        console.error('Erro ao buscar a notícia:', erro);
        setErro('Falha ao carregar a notícia. Por favor, tente novamente mais tarde.');
        setCarregando(false);
      }
    };

    buscarNoticia();
  }, []);

  if (carregando) {
    return <Loader />; // Usando nosso loader
  }

  if (erro) {
    return <div className="text-center text-red-500">{erro}</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 text-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-center">Notícia Principal</h2>
      {noticia && (
        <a href={noticia.url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105">
          {noticia.urlToImage && <img src={noticia.urlToImage} alt={noticia.title} className="mb-4 rounded h-48 w-full object-cover" />}
          <h3 className="text-xl font-semibold">{noticia.title}</h3>
          <p className="mt-2">{noticia.description}</p>
          <span className="text-blue-500 mt-4 inline-block">Leia mais</span>
        </a>
      )}
    </div>
  );
};

export default NoticiaPrincipal;
