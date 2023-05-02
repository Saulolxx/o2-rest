import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../entities/language.entity';
import { GetOneLanguage } from './get-one-language.service';

export type UpdateLanguageProps = {
  id: number;
  name: string;
};

@Injectable()
export class UpdateLanguage {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private readonly getOneLanguage: GetOneLanguage,
  ) {}

  public async run({ id, name }: UpdateLanguageProps) {
    const language = await this.getOneLanguage.run(id);

    if (name !== language.name) {
      const existingLanguage: Language | undefined =
        await this.languageRepository.findOne({
          where: {
            name,
          },
        });

      if (existingLanguage)
        throw new BadRequestException('Language name already exists!');
    }

    Object.assign(language, {
      ...language,
      name,
    });
    await this.languageRepository.save(language);
    return language;
  }
}
