import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate(); // Mueve la función navigate dentro del componente MovieCard
  
    const handleMovieDetailsClick = (id) => {
      navigate(`/movie/${id}`);
    };
  
    return (
      <div className="w-full lg:w-3/4 p-4">
        <div className="border border-solid flex flex-col text-left items-center justify-center rounded-lg p-3">
          <p className="text-white text-center font-semibold text-3xl border-b-2">{movie.title}</p>
  
          {movie.poster_path && (
            <img className="flex items-center mt-3" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
          )}
  
          <button
            className="text-white bg-lime-900 m-2 p-3 rounded-2xl focus:outline-none focus:ring focus:ring-lime-500 hover:cursor-pointer"
            onClick={() => handleMovieDetailsClick(movie.id)}
          >
            Mas info
          </button>
        </div>
      </div>
    );
  };
  

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  

  const handleSearch = async () => {
    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    const apiKey = "2ea01630a26af3437d7d1622865524bb";
    const formattedQuery = encodeURIComponent(searchQuery.trim());
    const language = "es";

    const url = `https://api.themoviedb.org/3/search/movie?query=${formattedQuery}&api_key=${apiKey}&language=${language}`;

    setIsPending(true);
    setError(null);

    try {
      const response = await axios.get(url);
      console.log(response.data);
      const { results } = response.data;

      if (results.length === 0) {
        throw new Error("No se encontraron resultados para la búsqueda.");
      }

      setSearchResults(results);
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
    } finally {
      setIsPending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
        <div className="flex items-center justify-between text-white">
            <h1>‎</h1>
            <h1>‎</h1>

            <h2 className="fixed top-0 right-0 text-white mr-4 font-bold text-lg">
                <a target="_blank" href="https://soystalker.xyz">Creador</a>
            </h2>
        </div>

      <div className="flex flex-col">
        <div className="w-full flex flex-col items-center mt-3">

          <div className="flex flex-col items-center m-2 p-2">

            <h1 className="text-white font-bold m-2">
                <a href="/">
                    <span className="text-amber-400">API</span> Movies
                </a>
            </h1>

            <input
              className="m-2 p-3 rounded-2xl min-w-4 max-w-xl text-xl focus:outline-none focus:ring focus:ring-neutral-500 hover:cursor-pointer"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Título de película o serie"
            />
          </div>
        </div>

        <div className="w-full">
          {isPending && <p className="text-white">Cargando...</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {error && <p className="text-white">{error}</p>}
        </div>

        <div className="fixed bottom-0 right-0">
  <h2 className="m-4 text-white text-xl">
    Gracias a <a target="_blank" href="https://developer.themoviedb.org/docs" className="ml-1 text-white"> <span className="text-amber-400">The Movie Data Base</span></a>
  </h2>
</div>


      </div>
    </>
  );
};

export default Home;
