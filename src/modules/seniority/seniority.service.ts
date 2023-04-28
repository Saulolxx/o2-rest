import { Injectable } from '@nestjs/common';
import { CreateSeniorityDto } from './dto/create-seniority.dto';
import { UpdateSeniorityDto } from './dto/update-seniority.dto';

@Injectable()
export class SeniorityService {
  create(createSeniorityDto: CreateSeniorityDto) {
    return 'This action adds a new seniority';
  }

  findAll() {
    return `This action returns all seniority`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seniority`;
  }

  update(id: number, updateSeniorityDto: UpdateSeniorityDto) {
    return `This action updates a #${id} seniority`;
  }

  remove(id: number) {
    return `This action removes a #${id} seniority`;
  }
}
