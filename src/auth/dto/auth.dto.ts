import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be at between 8 and 20 chars' })
  public password: string;

  public role: string;
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