import { Injectable } from '@nestjs/common';
import { CreateActivationDto } from './dto/create-activation.dto';
import { UpdateActivationDto } from './dto/update-activation.dto';

@Injectable()
export class ActivationService {
  create(createActivationDto: CreateActivationDto) {
    return 'This action adds a new activation';
  }

  findAll() {
    return `This action returns all activation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activation`;
  }

  update(id: number, updateActivationDto: UpdateActivationDto) {
    return `This action updates a #${id} activation`;
  }

  remove(id: number) {
    return `This action removes a #${id} activation`;
  }
}
