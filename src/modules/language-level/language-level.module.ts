import { Module } from '@nestjs/common';
import { LanguageLevelController } from './language-level.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageLevel } from './entities/language-level.entity';
import {
  CreateLanguageLevelService,
  DeleteLanguageLevelService,
  GetAllLanguageLevelService,
  GetOneByIdLanguageLevelService,
  UpdateLanguageLevelService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageLevel])],
  controllers: [LanguageLevelController],
  providers: [
    CreateLanguageLevelService,
    GetOneByIdLanguageLevelService,
    GetAllLanguageLevelService,
    UpdateLanguageLevelService,
    DeleteLanguageLevelService,
  ],
})
export class LanguageLevelModule {}
