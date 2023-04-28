import { MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class UpdateSegmentDto {
  @IsNotEmpty({ message: 'Name is mandatory.' })
  @IsString({ message: 'Name must be a string.' })
  @MaxLength(50, { message: 'Name Max length is 500 characters.' })
  name: string;
}
