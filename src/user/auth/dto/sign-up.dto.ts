import {
  IsNotEmpty,
  IsAlphanumeric,
  IsEmail,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
