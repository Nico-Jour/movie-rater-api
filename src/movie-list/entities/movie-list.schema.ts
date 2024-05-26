import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ArrayMaxSize } from 'class-validator';
import { Document, Model } from 'mongoose';

@Schema()
export class MovieList {
  @Prop({ type: String, required: true, unique: true })
  userId: string;

  @Prop({ type: [String], required: true, default: [] })
  @ArrayMaxSize(3)
  movieList: string[];
}

export const MovieListSchema = SchemaFactory.createForClass(MovieList);
type MovieListDocument = MovieList & Document;
export type MovieListModel = Model<MovieListDocument>;
