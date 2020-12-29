import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
