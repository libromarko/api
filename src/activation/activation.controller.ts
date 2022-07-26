import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ActivationService } from './activation.service';
import { CreateActivationDto } from './dto/create-activation.dto';
import { UpdateActivationDto } from './dto/update-activation.dto';

@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
@Controller('activation')
export class ActivationController {
  constructor(private readonly activationService: ActivationService) {}

  @Post()
  create(@Body() createActivationDto: CreateActivationDto) {
    return this.activationService.create(createActivationDto);
  }

  @Get()
  findAll() {
    return this.activationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivationDto: UpdateActivationDto,
  ) {
    return this.activationService.update(+id, updateActivationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activationService.remove(+id);
  }
}
