import { Movie } from '@/types/movie';

const TMDB_API = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export async function getPopularMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_API}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
  );
  const data = await res.json();
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_API}/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`
  );
  const data = await res.json();
  return data.results;
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_API}/movie/upcoming?api_key=${API_KEY}&language=pt-BR&page=1`
  );
  const data = await res.json();
  return data.results;
}

export async function getGenres() {
  const res = await fetch(
    `${TMDB_API}/genre/movie/list?language=pt-BR&api_key=${process.env.TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Erro ao buscar gêneros');
  }

  const data = await res.json();
  return data.genres;
}
