import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';

import config from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { SeniorityModule } from './modules/seniority/seniority.module';
import { SegmentModule } from './modules/segment/segment.module';
import { PersonModule } from './modules/person/person.module';
import { ExperienceRegimeModule } from './modules/experience-regime/experience-regime.module';
import { SkillLevelModule } from './modules/skill-level/skill-level.module';
import { LanguageLevelModule } from './modules/language-level/language-level.module';
import { CurrencyModule } from './modules/currency/currency.module';
import { DegreeModalityModule } from './modules/degree-modality/degree-modality.module';

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
    SeniorityModule,
    SkillLevelModule,
    SegmentModule,
    PersonModule,
    ExperienceRegimeModule,
    LanguageLevelModule,
    CurrencyModule,
    DegreeModalityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
