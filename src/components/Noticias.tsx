import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoticiaPrincipal from './Noticia_principal';

const Noticias: React.FC = () => {
  const [noticiasSecundarias, setNoticiasSecundarias] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [pagina, setPagina] = useState(1);
  const noticiasPorPagina = 6; // Alterado para 6 notícias por página

  useEffect(() => {
    const buscarNoticiasSecundarias = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API || '';
        if (!apiKey) {
          throw new Error('Token da API não encontrado');
        } // Certifique-se de que esta variável está definida no .env.local e nas configurações da Vercel

        const resposta = await axios.get(`https://newsapi.org/v2/everything?q=mercado+financeiro+brasil&apiKey=${apiKey}`, {
          headers: {
            'Accept': 'application/json', // Adicione cabeçalhos conforme necessário
            'User-Agent': 'FinançasFacil' // Substitua pelo nome do seu aplicativo
          }
        });
        
        // Verificando se a resposta contém artigos
        if (resposta.data.articles.length === 0) {
          throw new Error('Nenhuma notícia encontrada.');
        }

        const dados = resposta.data.articles; // Pega todas as notícias
        setNoticiasSecundarias(dados.filter((noticia: { title: string }) => noticia.title !== '[Removed]')); // Ignora notícias removidas
        setCarregando(false);
      } catch (erro) {
        console.error('Erro ao buscar as notícias secundárias:', erro);
        setErro('Falha ao carregar as notícias. Por favor, tente novamente mais tarde.');
        setCarregando(false);
      }
    };

    buscarNoticiasSecundarias();
  }, []);


  if (carregando) {
    return <div className="text-center">Carregando notícias...</div>; // Loader simples
  }

  if (erro) {
    return <div className="text-center text-red-500">{erro}</div>;
  }

  const indexInicial = (pagina - 1) * noticiasPorPagina;
  const noticiasExibidas = noticiasSecundarias.slice(indexInicial, indexInicial + noticiasPorPagina);

  return (
    <div>
      <NoticiaPrincipal />
      <div className="w-full max-w-6xl mx-auto p-4 text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Outras Notícias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> {/* Alterado para 3 colunas */}
          {noticiasExibidas
            .filter(noticia => noticia.title !== '[Removed]' && noticia.title !== noticiasSecundarias[0]?.title) // Ignora a notícia principal e removidas
            .map((noticia) => (
              <a key={noticia.url} href={noticia.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105">
                {noticia.urlToImage && (
                  <img src={noticia.urlToImage} alt={noticia.title} className="mb-4 rounded h-48 w-full object-cover" />
                )}
                <h3 className="text-xl font-semibold">{noticia.title}</h3>
                <p className="mt-2">{noticia.description}</p>
              </a>
            ))}
        </div>
        <div className="flex justify-between mt-4">
          <button 
            onClick={() => setPagina(pagina > 1 ? pagina - 1 : 1)} 
            disabled={pagina === 1} 
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button 
            onClick={() => setPagina(pagina + 1)} 
            disabled={indexInicial + noticiasPorPagina >= noticiasSecundarias.length} 
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noticias;
