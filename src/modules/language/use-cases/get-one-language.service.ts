import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../entities/language.entity';

@Injectable()
export class GetOneLanguage {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  public async run(id: number) {
    const language = await this.languageRepository.findOne({
      where: {
        id,
      },
    });

    if (!language) throw new NotFoundException('Language has not been found.');

    return language;
  }
}
