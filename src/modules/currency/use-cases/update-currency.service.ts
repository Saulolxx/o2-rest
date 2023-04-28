import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../entities/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateCurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) {}

  public async run(id: number, updatedCurrency: Currency) {
    const currency = await this.currenciesRepository.findOneBy({ id });

    if (!currency) {
      throw new NotFoundException();
    }

    Object.assign(currency, updatedCurrency);

    return this.currenciesRepository.save(currency);
  }
}
