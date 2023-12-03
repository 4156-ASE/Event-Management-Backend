import { IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  public firstname: string;

  @IsString()
  public lastname: string;
}
