import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'Bookmark group id',
    type: String,
  })
  @IsString()
  @IsOptional()
  groupId: string;

  @ApiProperty({
    description: 'Link',
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Bookmark summary',
    type: String,
  })
  @IsOptional()
  @IsString()
  summary: string;
}
