import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { MovieList, MovieListModel } from './entities/movie-list.schema';

@Injectable()
export class MovieListService {
  constructor(
    @InjectModel(MovieList.name) private movieListModel: MovieListModel,
  ) {}

  async create(userId: string) {
    return await this.movieListModel.create({ userId });
  }

  async findAll(userId: string) {
    return await this.movieListModel.find({ userId });
  }

  async findOne(id: string) {
    return await this.movieListModel.find({ userId: id });
  }

  async update(userId: string, updateMovieListDto: UpdateMovieListDto) {
    const [movieList] = await this.movieListModel.find({ userId });

    if (movieList.list.length >= 3) {
      throw new HttpException(
        `Bad request: the maximum number of movies is reached, delete one and retry`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (movieList.list.includes(updateMovieListDto.movieId)) {
      throw new HttpException(
        `Bad request: this movie is already in the list`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      movieList.list.push(updateMovieListDto.movieId);
    }

    return await this.movieListModel.updateOne(
      { _id: movieList._id },
      {
        list: movieList.list,
      },
    );
  }

  remove(userId: string, movieId: string) {
    return;
  }
}
