import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageLevel } from '../entities/language-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllLanguageLevelService {
  constructor(
    @InjectRepository(LanguageLevel)
    private languageLevelsRepository: Repository<LanguageLevel>,
  ) {}

  public run() {
    return this.languageLevelsRepository.find();
  }
}
