import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserId } from 'src/decorator/userId.decorator';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';
import { MovieListService } from './movie-list.service';

@Controller('movie-list')
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Get()
  findAll(@UserId() userId: string) {
    return this.movieListService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieListDto: UpdateMovieListDto,
  ) {
    return this.movieListService.update(+id, updateMovieListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieListService.remove(+id);
  }
}
