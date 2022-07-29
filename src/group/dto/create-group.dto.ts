import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Group name',
    type: String,
  })
  @IsString()
  name: string;
}
