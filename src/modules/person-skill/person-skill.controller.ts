import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePersonSkillDto } from './dto/create-person-skill.dto';
import { UpdatePersonSkillDto } from './dto/update-person-skill.dto';
import {
  CreatePersonSkillProps,
  CreatePersonSkillService,
  DeletePersonSkillService,
  GetAllPersonSkillService,
  GetOneByIdPersonSkillService,
  UpdatePersonSkillProps,
  UpdatePersonSkillService,
} from './use-cases';

@Controller('persons/:personId/skills')
export class PersonSkillController {
  constructor(
    private readonly createPersonSkillService: CreatePersonSkillService,
    private readonly updatePersonSkillService: UpdatePersonSkillService,
    private readonly deletePersonSkillService: DeletePersonSkillService,
    private readonly getOneByIdPersonSkillService: GetOneByIdPersonSkillService,
    private readonly getAllPersonSkillService: GetAllPersonSkillService,
  ) {}

  @Post()
  @HttpCode(201)
  create(
    @Body() createPersonSkillDto: CreatePersonSkillDto,
    @Param('personId', ParseIntPipe) personId: number,
  ) {
    const createPersonSkillProps: CreatePersonSkillProps = {
      ...createPersonSkillDto,
      personId,
    };
    return this.createPersonSkillService.run(createPersonSkillProps);
  }

  @Get()
  findAll(@Param('personId', ParseIntPipe) personId: number) {
    return this.getAllPersonSkillService.run(personId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('personId', ParseIntPipe) personId: number,
  ) {
    return this.getOneByIdPersonSkillService.run(+id, personId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('personId', ParseIntPipe) personId: number,
    @Body() updatePersonSkillDto: UpdatePersonSkillDto,
  ) {
    const updatePersonSkillProps: UpdatePersonSkillProps = {
      ...updatePersonSkillDto,
      personId,
      id,
    };
    return this.updatePersonSkillService.run(updatePersonSkillProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('personId', ParseIntPipe) personId: number,
  ) {
    return this.deletePersonSkillService.run(+id, personId);
  }
}
