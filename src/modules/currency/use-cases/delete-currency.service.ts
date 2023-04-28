import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../entities/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteCurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) {}

  public async run(id: number) {
    await this.currenciesRepository.delete({ id });
    return;
  }
}
