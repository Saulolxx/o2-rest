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
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { Interview } from './entities/interview.entity';
import {
  CreateInterviewProps,
  CreateInterviewService,
  DeleteInterviewService,
  GetAllInterviewService,
  GetOneByIdInterviewService,
  UpdateInterviewProps,
  UpdateInterviewService,
} from './use-cases';

@Controller('interviews')
export class InterviewController {
  constructor(
    private readonly createInterviewService: CreateInterviewService,
    private readonly updateInterviewService: UpdateInterviewService,
    private readonly deleteInterviewService: DeleteInterviewService,
    private readonly getOneByIdInterviewService: GetOneByIdInterviewService,
    private readonly getAllInterviewService: GetAllInterviewService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createInterviewDto: CreateInterviewDto) {
    const createInterviewProps: CreateInterviewProps = {
      ...createInterviewDto,
    };
    return this.createInterviewService.run(createInterviewProps);
  }

  @Get()
  findAll() {
    return this.getAllInterviewService.run();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getOneByIdInterviewService.run(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ) {
    const updateInterviewProps: UpdateInterviewProps = {
      ...updateInterviewDto,
      id,
    };
    return this.updateInterviewService.run(updateInterviewProps);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteInterviewService.run(+id);
  }
}
