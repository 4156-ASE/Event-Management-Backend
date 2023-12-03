import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be at between 8 and 20 chars' })
  public password: string;
}

export class AuthSignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be at between 8 and 20 chars' })
  public password: string;
}