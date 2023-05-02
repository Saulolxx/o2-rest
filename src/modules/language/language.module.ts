import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { LanguageService } from './language.service';
import { CreateLanguage, GetAllLanguages, GetOneLanguage } from './use-cases';
import { LanguageController } from './language.controller';
import { DeleteOneLanguage } from './use-cases/delete-language.service';
import { UpdateLanguage } from './use-cases/update-language.service';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [
    LanguageService,
    CreateLanguage,
    UpdateLanguage,
    GetAllLanguages,
    GetOneLanguage,
    DeleteOneLanguage,
  ],
  exports: [TypeOrmModule, LanguageService],
})
export class LanguageModule {}
