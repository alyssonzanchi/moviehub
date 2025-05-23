import { MovieCarousel } from '@/components/MovieCarousel';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getGenres
} from '@/lib/tmdb';

export default async function HomePage() {
  const [popular, topRated, upcoming, genres] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
    getGenres()
  ]);

  const genreMap = Object.fromEntries(genres.map((g: any) => [g.id, g.name]));

  const mapMovies = (movies: any[]) =>
    movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      imageUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/160x240?text=Sem+Imagem',
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      genres: movie.genre_ids.map((id: number) => genreMap[id]).filter(Boolean)
    }));

  return (
    <main className="p-6 space-y-10">
      <MovieCarousel title="Populares" movies={mapMovies(popular)} />
      <MovieCarousel title="Mais bem avaliados" movies={mapMovies(topRated)} />
      <MovieCarousel title="Em breve" movies={mapMovies(upcoming)} />
    </main>
  );
}
