import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageLevel } from '../entities/language-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdLanguageLevelService {
  constructor(
    @InjectRepository(LanguageLevel)
    private languageLevelsRepository: Repository<LanguageLevel>,
  ) {}

  public async run(id: number) {
    const languageLevel = await this.languageLevelsRepository.findOneBy({ id });
    if (!languageLevel) throw new NotFoundException();

    return languageLevel;
  }
}
