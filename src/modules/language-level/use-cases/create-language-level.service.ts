import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageLevel } from '../entities/language-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateLanguageLevelService {
  constructor(
    @InjectRepository(LanguageLevel)
    private languageLevelsRepository: Repository<LanguageLevel>,
  ) {}

  public run(languageLevel: LanguageLevel) {
    return this.languageLevelsRepository.save(languageLevel);
  }
}
