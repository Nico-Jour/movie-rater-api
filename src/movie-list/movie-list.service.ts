import { Injectable } from '@nestjs/common';
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
