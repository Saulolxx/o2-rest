import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from '../entities/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllCurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) {}

  public run() {
    return this.currenciesRepository.find();
  }
}
