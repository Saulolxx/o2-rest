import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageLevel } from '../entities/language-level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteLanguageLevelService {
  constructor(
    @InjectRepository(LanguageLevel)
    private languageLevelsRepository: Repository<LanguageLevel>,
  ) {}

  public async run(id: number) {
    await this.languageLevelsRepository.delete({ id });
    return;
  }
}
