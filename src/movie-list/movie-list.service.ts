import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { MovieListModel } from './entities/movie-list.schema';

@Injectable()
export class MovieListService {
  constructor(@Inject() private movieListModel: MovieListModel) {}

  create(createMovieListDto: CreateMovieListDto) {
    return 'This action adds a new movieList';
  }

  async findAll(userId) {
    return await this.movieListModel.find({ userId });
  }

  findOne(id: number) {
    return `This action returns a #${id} movieList`;
  }

  update(id: number, updateMovieListDto: UpdateMovieListDto) {
    return `This action updates a #${id} movieList`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieList`;
  }
}
