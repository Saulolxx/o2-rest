import { MaxLength, IsString, IsNotEmpty } from 'class-validator';

export class UpdateLanguageDto {
  @IsNotEmpty({ message: 'Name is mandatory.' })
  @IsString({ message: 'Name must be a string.' })
  @MaxLength(200, { message: 'Name Max length is 200 characters.' })
  name: string;
}
