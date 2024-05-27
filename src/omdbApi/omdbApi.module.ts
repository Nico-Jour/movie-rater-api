import { Module } from '@nestjs/common';
import { OmdbApiService } from './omdbApi.service';

@Module({
  exports: [OmdbApiService],
  providers: [OmdbApiService],
})
export class OmdbApiModule {}
