import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninAuthDto {
  @ApiProperty({
    description: 'User email',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
  })
  @Length(8, 64)
  @IsString()
  @IsNotEmpty()
  password: string;
}
