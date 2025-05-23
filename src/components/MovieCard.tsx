import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card className="rounded-lg shadow hover:scale-105 transition w-[200px] h-[460px] p-0 overflow-hidden cursor-pointer">
      <div className="relative w-full h-[300px]">
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="200px"
        />
      </div>
      <CardContent className="p-2 text-sm font-medium">
        <CardTitle className="text-base mt-1">{movie.title}</CardTitle>
        <div className="text-sm text-muted-foreground mt-1">
          {movie.releaseDate}
        </div>
        <div className="text-sm text-yellow-600 font-medium mt-1">
          ⭐ {movie.voteAverage.toFixed(1)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {movie.genres.join(', ')}
        </div>
      </CardContent>
    </Card>
  );
}
