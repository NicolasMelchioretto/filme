import React, { useState } from "react";
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counter, setCounter] = useState(0);

  // Função para carregar os filmes da API
  function loadApi() {
    const apiKey = "33279cc1"; // Insira sua chave da OMDB API
    let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        if (json.Response === "True") {
          setMovies(json.Search);
          setCounter(prevCount => prevCount + 1); 
        } else {
          console.log("Nenhum filme encontrado");
          setMovies([]);
        }
      })
      .catch((err) => {
        console.log("Erro ao buscar dados da API", err);
      });
  }

  return (
    <div className="container">
      <header>
        <strong>Cinema Nicolas</strong>
      </header>

      <div className="search-section">
        <input 
          type="text" 
          placeholder="Digite o nome do filme" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={loadApi} className="botao">Buscar</button> 
      </div>

      <div>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <article key={movie.imdbID} className="post">
              <strong className="titulo">{movie.Title}</strong>
              <img src={movie.Poster} alt={movie.Title} className="capa" />
            </article>
          ))
        ) : (
          <p>Nenhum filme encontrado!</p>
        )}
      </div>
    </div>
  );
}

export default App;
