import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MovieList,
  MovieListSchema,
} from 'src/movie-list/entities/movie-list.schema';
import { MovieListModule } from 'src/movie-list/movie-list.module';
import { User, UserSchema } from './entities/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: MovieList.name, schema: MovieListSchema },
    ]),
    forwardRef(() => MovieListModule),
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
