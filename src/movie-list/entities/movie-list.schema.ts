import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ArrayMaxSize } from 'class-validator';
import { Document, Model } from 'mongoose';
import { MAX_LIST_MOVIES } from 'src/constants';
import { BaseDocument } from 'src/types/base-documents';

@Schema()
export class MovieList extends BaseDocument {
  @Prop({ type: String, required: true, unique: true })
  userId: string;

  @Prop({ type: [String], required: true, default: [] })
  @ArrayMaxSize(MAX_LIST_MOVIES)
  list: string[];
}

export const MovieListSchema = SchemaFactory.createForClass(MovieList);
type MovieListDocument = MovieList & Document;
export type MovieListModel = Model<MovieListDocument>;
