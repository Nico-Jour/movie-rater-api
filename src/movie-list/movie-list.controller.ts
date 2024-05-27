import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserId } from 'src/decorator/userId.decorator';
import { MovieListService } from './movie-list.service';

@Controller('movie-list')
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Get()
  findOne(@UserId() id: string) {
    return this.movieListService.findOne(id);
  }

  @Get('most-rated')
  findMostRated() {
    return this.movieListService.findMostRated();
  }

  @Get('all-voters')
  findAllVoters(@UserId() userId: string) {
    return this.movieListService.findAllVoters(userId);
  }

  @Patch(':movieId')
  update(@UserId() userId: string, @Param('movieId') movieId: string) {
    return this.movieListService.update(userId, movieId);
  }

  @Delete(':movieId')
  delete(@UserId() userId: string, @Param('movieId') movieId: string) {
    return this.movieListService.delete(userId, movieId);
  }
}
