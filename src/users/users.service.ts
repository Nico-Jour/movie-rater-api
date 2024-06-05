import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MovieListService } from 'src/movie-list/movie-list.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserModel } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: UserModel,
    @Inject(forwardRef(() => MovieListService))
    private movielistService: MovieListService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      await this.movielistService.create(createdUser.id);
      return createdUser;
    } catch (error) {
      console.log('error', error);
      throw new HttpException(`Bad request: ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllVoted() {
    return 'all voted users';
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findByPseudo(pseudo: string) {
    return await this.userModel.find({ pseudo });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
