import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';

import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { LanguageModule } from './modules/language/language.module';
import { SeniorityModule } from './modules/seniority/seniority.module';
import { SegmentModule } from './modules/segment/segment.module';
import { PersonModule } from './modules/person/person.module';
import { ExperienceRegimeModule } from './modules/experience-regime/experience-regime.module';
import { SkillLevelModule } from './modules/skill-level/skill-level.module';
import { LanguageLevelModule } from './modules/language-level/language-level.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { DegreeModalityModule } from './modules/degree-modality/degree-modality.module';
import { DegreeSituationModule } from './modules/degree-situation/degree-situation.module';
import { PersonTypeModule } from './modules/person-type/person-type.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { ExperienceModalityModule } from './modules/experience-modality/experience-modality.module';
import { DegreeModule } from './modules/degree/degree.module';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { CertificationModule } from './modules/certification/certification.module';
import { VacancyModule } from './modules/vacancy/vacancy.module';
import { CandidatureModule } from './modules/candidature/candidature.module';
import { SkillModule } from './modules/skill/skill.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: +configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.pass'),
          database: configService.get('database.name'),
          entities: [resolve(__dirname, '**', '*.entity{.ts,.js}')],
          autoLoadEntities: true,
        };
      },
    }),
    LanguageModule,
    SeniorityModule,
    SkillLevelModule,
    SegmentModule,
    PersonModule,
    ExperienceRegimeModule,
    LanguageLevelModule,
    CurrencyModule,
    DegreeModalityModule,
    ExperienceModalityModule,
    DegreeSituationModule,
    PersonTypeModule,
    ExperienceModule,
    DegreeModule,
    EvaluationModule,
    CertificationModule,
    VacancyModule,
    CandidatureModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
