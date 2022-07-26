import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    description: 'Profile first name',
    type: String,
  })
  @MaxLength(60, {
    message: 'Name is too long',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Profile last name',
    type: String,
  })
  @MaxLength(60, {
    message: 'Name is too long',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Profile bio',
    type: String,
  })
  @MaxLength(140, {
    message: 'Bio is too long',
  })
  @IsString()
  bio: string;
}
