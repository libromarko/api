import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Group name',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Group is public',
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  public: boolean;
}
