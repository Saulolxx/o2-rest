import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../entities/language.entity';
import { UpdateLanguageProps } from './update-language.service';

export type CreateLanguageProps = Omit<UpdateLanguageProps, 'id'>;

@Injectable()
export class CreateLanguage {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  public async run({ name }: CreateLanguageProps) {
    const existingLanguage: Language | undefined =
      await this.languageRepository.findOne({
        where: {
          name,
        },
      });

    if (existingLanguage)
      throw new BadRequestException('Language name already exists!');

    const language = new Language();
    Object.assign(language, {
      name,
    });

    await this.languageRepository.save(language);
    return language;
  }
}
