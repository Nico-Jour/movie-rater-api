import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieListService } from './movie-list.service';
import { CreateMovieListDto } from './dto/create-movie-list.dto';
import { UpdateMovieListDto } from './dto/update-movie-list.dto';

@Controller('movie-list')
export class MovieListController {
  constructor(private readonly movieListService: MovieListService) {}

  @Post()
  create(@Body() createMovieListDto: CreateMovieListDto) {
    return this.movieListService.create(createMovieListDto);
  }

  @Get()
  findAll() {
    return this.movieListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieListDto: UpdateMovieListDto) {
    return this.movieListService.update(+id, updateMovieListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieListService.remove(+id);
  }
}
