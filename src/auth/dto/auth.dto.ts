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

export interface AuthSignInResp {
  status: string;
  token: string;
  userID: string;
  message: string;
  user: {
    id: string;
    email: string;
    password: string;
    lastname: string;
    firstname: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
