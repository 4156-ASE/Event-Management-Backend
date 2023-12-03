import { IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;
}
