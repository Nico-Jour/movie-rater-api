import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieListModule } from './movie-list/movie-list.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/movie-rater-db'),
    MovieListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
