import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'Name is mandatory.' })
  @IsString({ message: 'Name must be a string.' })
  @MaxLength(50, { message: 'Name Max length is 50 characters.' })
  name: string;

  @IsNotEmpty({ message: 'Email is mandatory.' })
  @IsEmail()
  @MaxLength(250, { message: 'Email Max length is 250 characters.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Linkedin must be a string.' })
  @MaxLength(150, { message: 'Linkedin Max length is 150 characters.' })
  linkedin: string;

  @IsNotEmpty({ message: 'Birthday is mandatory.' })
  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsString({ message: 'Compleoid must be a string.' })
  @MaxLength(50, { message: 'Compleoid Max length is 50 characters.' })
  compleoid: string;

  @IsNotEmpty({ message: 'Phone is mandatory.' })
  @IsPhoneNumber()
  @MaxLength(50, { message: 'Phone Max length is 50 characters.' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Country must be a string.' })
  @MaxLength(100, { message: 'Country Max length is 100 characters.' })
  country: string;

  @IsOptional()
  @IsString({ message: 'State must be a string.' })
  @MaxLength(100, { message: 'State Max length is 100 characters.' })
  state: string;

  @IsOptional()
  @IsString({ message: 'City must be a string.' })
  @MaxLength(100, { message: 'City Max length is 100 characters.' })
  city: string;

  @IsOptional()
  @IsBoolean({ message: 'RedFlag must be a boolean.' })
  redFlag: boolean;

  @IsOptional()
  @IsString({ message: 'ReasonRedFlag must be a string.' })
  @MaxLength(500, { message: 'ReasonRedFlag Max length is 500 characters.' })
  reasonRedFlag: string;

  @IsNotEmpty({ message: 'PersonTypeId is mandatory.' })
  @IsNumber()
  personTypeId: number;
}
