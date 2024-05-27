import { Controller, Get, Param, Patch } from '@nestjs/common';
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

  @Patch(':movieId')
  update(@UserId() id: string, @Param('movieId') movieId: string) {
    console.log('id, movieId', id, movieId);
    return this.movieListService.update(id, movieId);
  }
}
