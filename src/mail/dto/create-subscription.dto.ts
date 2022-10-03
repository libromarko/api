import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'Subscriber name',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Subscriber email',
    type: String,
  })
  @IsEmail()
  email: string;
}
