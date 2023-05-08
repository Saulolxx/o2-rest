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
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import {
  CreateCertificationProps,
  CreateCertificationService,
  DeleteCertificationService,
  GetAllCertificationService,
  GetOneByIdCertificationService,
  UpdateCertificationProps,
  UpdateCertificationService,
} from './use-cases';

@Controller('persons/:person_id/certifications')
export class CertificationController {
  constructor(
    private readonly createCertificationService: CreateCertificationService,
    private readonly updateCertificationService: UpdateCertificationService,
    private readonly deleteCertificationService: DeleteCertificationService,
    private readonly getOneByIdCertificationService: GetOneByIdCertificationService,
    private readonly getAllCertificationService: GetAllCertificationService,
  ) {}

  @Post()
  @HttpCode(201)
  create(
    @Param('person_id', ParseIntPipe) personId: number,
    @Body() createCertificationDto: CreateCertificationDto,
  ) {
    const createCertificationProps: CreateCertificationProps = {
      personId,
      ...createCertificationDto,
    };
    return this.createCertificationService.run(createCertificationProps);
  }

  @Get()
  findAll(@Param('person_id', ParseIntPipe) personId: number) {
    return this.getAllCertificationService.run(personId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('person_id', ParseIntPipe) personId: number,
  ) {
    return this.getOneByIdCertificationService.run(+id, personId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('person_id', ParseIntPipe) personId: number,
    @Body() updateCertificationDto: UpdateCertificationDto,
  ) {
    const updateCertificationProps: UpdateCertificationProps = {
      ...updateCertificationDto,
      id,
      personId,
    };

    return this.updateCertificationService.run(updateCertificationProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id') id: string,
    @Param('person_id', ParseIntPipe) personId: number,
  ) {
    return this.deleteCertificationService.run(+id, personId);
  }
}
