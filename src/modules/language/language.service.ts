import { Injectable } from '@nestjs/common';
import {
  CreateLanguage,
  CreateLanguageProps,
  DeleteOneLanguage,
  GetAllLanguages,
} from './use-cases';
import { GetOneLanguage } from './use-cases/get-one-language.service';
import { CreateLanguageDto, UpdateLanguageDto } from './dto';
import {
  UpdateLanguage,
  UpdateLanguageProps,
} from './use-cases/update-language.service';

@Injectable()
export class LanguageService {
  constructor(
    private readonly createLanguage: CreateLanguage,
    private readonly updateLanguage: UpdateLanguage,
    private readonly getAllLanguages: GetAllLanguages,
    private readonly getOneLanguage: GetOneLanguage,
    private readonly deleteLanguage: DeleteOneLanguage,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const createLanguageProps: CreateLanguageProps = {
      ...createLanguageDto,
    };
    return await this.createLanguage.run(createLanguageProps);
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const updateLanguageProps: UpdateLanguageProps = {
      id,
      ...updateLanguageDto,
    };
    return await this.updateLanguage.run(updateLanguageProps);
  }

  async findAll() {
    return await this.getAllLanguages.run();
  }

  async findOne(id: number) {
    return await this.getOneLanguage.run(id);
  }

  async delete(id: number) {
    return await this.deleteLanguage.run(id);
  }
}
