import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MAX_LIST_MOVIES } from 'src/constants';
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

  async update(userId: string, movieId: string) {
    const [movieList] = await this.movieListModel.find({ userId });

    if (movieList.list.length >= MAX_LIST_MOVIES) {
      throw new HttpException(
        `Bad request: the maximum number of movies is reached, delete one and retry`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (movieList.list.includes(movieId)) {
      const list = movieList.list.filter((id) => id != movieId);
      return await this.movieListModel.updateOne({ userId }, { list });
    } else {
      const list = [...movieList.list, movieId];
      return await this.movieListModel.updateOne({ userId }, { list });
    }
  }
}
