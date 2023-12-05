import { IsString } from 'class-validator';

export class UserUpdateDTO {
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
  email: string;

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;
}
