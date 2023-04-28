import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import {
  CreateCurrencyService,
  DeleteCurrencyService,
  GetAllCurrencyService,
  GetOneByIdCurrencyService,
  UpdateCurrencyService,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [
    CreateCurrencyService,
    GetOneByIdCurrencyService,
    GetAllCurrencyService,
    UpdateCurrencyService,
    DeleteCurrencyService,
  ],
})
export class CurrencyModule {}
