import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto, UpdatePersonDto } from './dto';
import { GetAllCandidatureService } from '../candidature/use-cases';

@Controller('persons')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly getAllCandidatures: GetAllCandidatureService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personService.update(id, updatePersonDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id/candidatures')
  async findAllCandidatures(@Param('id', ParseIntPipe) id: number) {
    await this.personService.findOne(id);
    return this.getAllCandidatures.run({ personId: id });
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.personService.deleteOne(id);
  }
}
