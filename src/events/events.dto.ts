import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserDetail } from 'src/users/dto/users.dto';

/** Create Event Req */
export class EventCreateReq {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsDateString()
  start_time: string;

  @IsNotEmpty()
  @IsDateString()
  end_time: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}

/** Update Event Req */
export class EventUpdateReq {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsDateString()
  @IsOptional()
  start_time?: string;

  @IsDateString()
  @IsOptional()
  end_time?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsOptional()
  host?: string;

  @IsOptional()
  participants?: string[];
}

/** Add user to an event Req */
export class AddUserReq {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;
}

/** Remove user from an event Req */
export class RemoveUserReq {
  @IsString()
  userId: string;
}

/** Change event's host Req */
export class ChangeHostReq {
  @IsString()
  userId: string;
}

/** Event Detail */
export class EventDetail {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;

  @IsString()
  location: string;

  @IsNotEmpty()
  host: UserDetail;

  @IsArray()
  participants: UserDetail[];
}
