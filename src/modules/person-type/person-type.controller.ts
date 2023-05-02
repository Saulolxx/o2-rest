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
import { CreatePersonTypeDto } from './dto/create-person-type.dto';
import { UpdatePersonTypeDto } from './dto/update-person-type.dto';
import { PersonType } from './entities/person-type.entity';
import {
  CreatePersonTypeService,
  DeletePersonTypeService,
  GetAllPersonTypeService,
  GetOneByIdPersonTypeService,
  UpdatePersonTypeService,
} from './use-cases';

@Controller('person-types')
export class PersonTypeController {
  constructor(
    private readonly createPersonTypeService: CreatePersonTypeService,
    private readonly updatePersonTypeService: UpdatePersonTypeService,
    private readonly deletePersonTypeService: DeletePersonTypeService,
    private readonly getOneByIdPersonTypeService: GetOneByIdPersonTypeService,
    private readonly getAllPersonTypeService: GetAllPersonTypeService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createPersonTypeDto: CreatePersonTypeDto) {
    const personType = new PersonType();

    Object.assign(personType, createPersonTypeDto);

    return this.createPersonTypeService.run(personType);
  }

  @Get()
  findAll() {
    return this.getAllPersonTypeService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdPersonTypeService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePersonTypeDto: UpdatePersonTypeDto,
  ) {
    const updatedPersonType = new PersonType();

    Object.assign(updatedPersonType, updatePersonTypeDto);

    return this.updatePersonTypeService.run(+id, updatedPersonType);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deletePersonTypeService.run(+id);
  }
}
