import { ArrayMaxSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieListDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(3)
  movieList: string[];
}
