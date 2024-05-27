import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly pseudo: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  readonly dateOfBirth: Date;
}
