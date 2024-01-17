import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @MaxLength(500)
  imageUrl: string;
}
