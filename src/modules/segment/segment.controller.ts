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
import { SegmentService } from './segment.service';
import { CreateSegmentDto, UpdateSegmentDto } from './dto';

@Controller('segments')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSegmentDto: CreateSegmentDto) {
    return this.segmentService.create(createSegmentDto);
  }

  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSegmentDto: UpdateSegmentDto,
  ) {
    return this.segmentService.update(id, updateSegmentDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.segmentService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.segmentService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.segmentService.deleteOne(id);
  }
}
