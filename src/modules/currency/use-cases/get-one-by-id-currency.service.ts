import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../entities/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetOneByIdCurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) {}

  public async run(id: number) {
    const currency = await this.currenciesRepository.findOneBy({ id });
    if (!currency) throw new NotFoundException();

    return currency;
  }
}
