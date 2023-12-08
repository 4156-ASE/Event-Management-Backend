import { IsEmail, IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;
}

/** User details */
export class UserDetail {
  @IsString()
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;
}
