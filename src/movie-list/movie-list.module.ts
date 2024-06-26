import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OmdbApiModule } from 'src/omdbApi/omdbApi.module';
import { UsersModule } from 'src/users/users.module';
import { MovieList, MovieListSchema } from './entities/movie-list.schema';
import { MovieListController } from './movie-list.controller';
import { MovieListService } from './movie-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovieList.name, schema: MovieListSchema },
    ]),
    forwardRef(() => UsersModule),
    OmdbApiModule,
  ],
  controllers: [MovieListController],
  providers: [MovieListService],
  exports: [MovieListService],
})
export class MovieListModule {}
