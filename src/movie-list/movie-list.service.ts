import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MAX_LIST_MOVIES } from 'src/constants';
import { OmdbApiService } from 'src/omdbApi/omdbApi.service';
import { Movie } from 'src/types/movie';
import { UsersService } from 'src/users/users.service';
import { MovieList, MovieListModel } from './entities/movie-list.schema';

@Injectable()
export class MovieListService {
  constructor(
    @InjectModel(MovieList.name) private movieListModel: MovieListModel,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly omdbApiService: OmdbApiService,
  ) {}

  async create(userId: string) {
    return await this.movieListModel.create({ userId });
  }

  async findMostRated() {
    const result = await this.movieListModel.aggregate([
      { $unwind: '$list' },
      {
        $group: {
          _id: '$list',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    if (result.length === 0) {
      console.log('No votes found');
      throw new HttpException('No votes found', HttpStatus.NOT_FOUND);
    }

    const mostVotedMovieId = result[0]._id;

    const { Title: title, Poster: poster } =
      await this.omdbApiService.get<Movie>('', { i: mostVotedMovieId });

    return { title, poster };
  }

  async findOne(userId: string) {
    const [movieList] = await this.movieListModel.find({ userId });
    const result = [];
    for (const movieId of movieList.list) {
      try {
        const { Title: title, Poster: poster } =
          await this.omdbApiService.get<Movie>('', { i: movieId });
        result.push({ title, poster });
      } catch (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      }
    }
    return result;
  }

  async update(userId: string, movieId: string) {
    const [movieList] = await this.movieListModel.find({ userId });
    let list = [];

    if (movieList.list.length >= MAX_LIST_MOVIES) {
      throw new HttpException(
        `Bad request: the maximum number of movies is reached, delete one and retry`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (movieList.list.includes(movieId)) {
      throw new HttpException(
        `Bad request: the movie is already in this list`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      list = [...movieList.list, movieId];
    }
    return await this.movieListModel.updateOne({ userId }, { list });
  }

  async delete(userId: string, movieId: string) {
    const [movieList] = await this.movieListModel.find({ userId });

    if (!movieList.list.includes(movieId)) {
      throw new HttpException(
        `Bad request: the movie was not in this list`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const list = movieList.list.filter((id) => id != movieId);

    return await this.movieListModel.updateOne({ userId }, { list });
  }

  async findAllVoters(userId: string) {
    const allNonEmptyList = await this.movieListModel.find(
      { list: { $ne: [], $exists: true } },
      { userId: 1, _id: 0 },
    );

    let pseudoVotersList = [];
    for (const { userId } of allNonEmptyList) {
      const { pseudo } = await this.usersService.findOne(userId);
      pseudoVotersList.push(pseudo);
    }
    return pseudoVotersList;
  }
}
