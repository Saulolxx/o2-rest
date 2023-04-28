import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../entities/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateCurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) {}

  public run(currency: Currency) {
    return this.currenciesRepository.save(currency);
  }
}
