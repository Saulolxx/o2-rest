import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../entities/language.entity';

@Injectable()
export class GetAllLanguages {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  public async run() {
    return await this.languageRepository.find();
  }
}
