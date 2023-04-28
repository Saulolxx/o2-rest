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
import { CreateLanguageLevelDto } from './dto/create-language-level.dto';
import { UpdateLanguageLevelDto } from './dto/update-language-level.dto';
import { LanguageLevel } from './entities/language-level.entity';
import {
  CreateLanguageLevelService,
  DeleteLanguageLevelService,
  GetAllLanguageLevelService,
  GetOneByIdLanguageLevelService,
  UpdateLanguageLevelService,
} from './use-cases';

@Controller('language-levels')
export class LanguageLevelController {
  constructor(
    private readonly createLanguageLevelService: CreateLanguageLevelService,
    private readonly updateLanguageLevelService: UpdateLanguageLevelService,
    private readonly deleteLanguageLevelService: DeleteLanguageLevelService,
    private readonly getOneByIdLanguageLevelService: GetOneByIdLanguageLevelService,
    private readonly getAllLanguageLevelService: GetAllLanguageLevelService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createLanguageLevelDto: CreateLanguageLevelDto) {
    const languageLevel = new LanguageLevel();

    Object.assign(languageLevel, createLanguageLevelDto);

    return this.createLanguageLevelService.run(languageLevel);
  }

  @Get()
  findAll() {
    return this.getAllLanguageLevelService.run();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneByIdLanguageLevelService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageLevelDto: UpdateLanguageLevelDto,
  ) {
    const updatedLanguageLevel = new LanguageLevel();

    Object.assign(updatedLanguageLevel, updateLanguageLevelDto);

    return this.updateLanguageLevelService.run(+id, updatedLanguageLevel);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteLanguageLevelService.run(+id);
  }
}
