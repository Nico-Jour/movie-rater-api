import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieList, MovieListSchema } from './entities/movie-list.schema';
import { MovieListController } from './movie-list.controller';
import { MovieListService } from './movie-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovieList.name, schema: MovieListSchema },
    ]),
  ],
  controllers: [MovieListController],
  providers: [MovieListService],
  exports: [MovieListService],
})
export class MovieListModule {}
