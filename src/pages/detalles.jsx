import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';


const MovieDetails = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const apiKey = '2ea01630a26af3437d7d1622865524bb';
        const language = 'es';
        const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`;
        const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=${language}`;
    
        Promise.all([
          axios.get(detailsUrl),
          axios.get(videosUrl)
        ])
          .then(([detailsResponse, videosResponse]) => {
            setIsPending(false);
    
            if (detailsResponse.data) {
              setMovieDetails(detailsResponse.data);
            } else {
              throw new Error('No se encontraron detalles de la película/serie.');
            }
    
            const teaserVideo = videosResponse.data.results.find(video => video.type === "Teaser" || video.type === "Trailer");
            if (teaserVideo) {
              setVideoKey(teaserVideo.key);
            } else {
              setVideoKey(null);
            }
          })
          .catch((error) => {
            setIsPending(false);
            setError('Error al obtener los detalles de la película/serie: ' + error.message);
            setMovieDetails(null);
            setVideoKey(null);
          });
      }, [id]);


      const datosFormateados = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate() + 1
        const month = date.getMonth(); // El mes en formato numérico (0 - 11)
        const year = date.getFullYear();
      
        const monthNames = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
      
        return `${day} de ${monthNames[month]} del ${year}`;
      };
      

      return (
        <div className='flex flex-col items-center'>

        <div className="flex items-center justify-between text-white">
            <h2 className="fixed top-0 right-0 text-white mr-4 font-bold text-lg">
                <a target="_blank" href="https://soystalker.xyz">Creador</a>
            </h2>
        </div>

          {isPending && <p className="text-white">Cargando...</p>}
    
          {movieDetails && (
            <div className='m-3 p-3 border border-solid flex flex-col text-left items-center justify-center rounded-lg'>
              <p className="text-white text-center font-semibold text-3xl border-b-2">{movieDetails.title}</p>
              <p className="text-amber-400 font-medium text-lg m-2">Estreno: {movieDetails.release_date ? datosFormateados(movieDetails.release_date) : 'Fecha no disponible'}</p>
              <p className="text-white font-medium text-lg m-2">+18: {movieDetails.adult ? 'Si' : 'No'}</p>
              <p className="text-white font-medium text-lg m-2">Lenguaje: {movieDetails.original_language}</p>
              <p className="text-white font-medium text-lg m-2">Duracion: {movieDetails.runtime} Minutos</p>
    
              <p className="text-white font-medium text-lg m-2">
                Descripción: {movieDetails.overview ? movieDetails.overview : (movieDetails.overviewEnglish || 'Descripción no disponible en inglés')}
              </p>
    
              {videoKey ? (
                  <div className="flex items-center m-5 max-w-xl w-full">
                    <YouTube videoId={videoKey} />
                  </div>
                ) : (
                  <p className="text-white text-center bg-red-700 m-2 p-3 rounded-2xl">No se encontró el trailer.</p>
                )}
    
              {/* {movieDetails.poster_path && (
                <img className='flex items-center' src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt={movieDetails.title} />
              )} */}
            </div>
          )}
    
          {!isPending && !movieDetails && <p className="text-white">No se encontraron detalles de la película/serie.</p>}
    
          <button
            className='text-white bg-lime-900 m-2 p-3 rounded-2xl focus:outline-none focus:ring focus:ring-lime-500 hover:cursor-pointer'
            onClick={() => navigate('/')}
          >
            Volver
          </button>
        </div>
      );
    };

export default MovieDetails;
