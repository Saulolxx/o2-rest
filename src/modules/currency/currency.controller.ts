import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';
import {
  CreateCurrencyService,
  DeleteCurrencyService,
  GetAllCurrencyService,
  GetOneByIdCurrencyService,
  UpdateCurrencyService,
} from './use-cases';

@Controller('currencies')
export class CurrencyController {
  constructor(
    private readonly createCurrencyService: CreateCurrencyService,
    private readonly updateCurrencyService: UpdateCurrencyService,
    private readonly deleteCurrencyService: DeleteCurrencyService,
    private readonly getOneByIdCurrencyService: GetOneByIdCurrencyService,
    private readonly getAllCurrencyService: GetAllCurrencyService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    const currency = new Currency();

    Object.assign(currency, createCurrencyDto);

    return this.createCurrencyService.run(currency);
  }

  @Get()
  findAll() {
    return this.getAllCurrencyService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdCurrencyService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ) {
    const updatedCurrency = new Currency();

    Object.assign(updatedCurrency, updateCurrencyDto);

    return this.updateCurrencyService.run(+id, updatedCurrency);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteCurrencyService.run(+id);
  }
}
