import { IsString } from 'class-validator';

export class UpdateMovieListDto {
  @IsString()
  movieId: string;
}
