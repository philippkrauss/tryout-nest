import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  BadRequestException,
  UseFilters,
  ForbiddenException,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../common/http-exception.filter';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body(ValidationPipe) createCatDto: CreateCatDto) {
    this.catsService.create({
      age: createCatDto.age,
      breed: createCatDto.breed,
      name: createCatDto.name,
    });
  }

  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    console.log('test.....', activeOnly, page);
    return this.catsService.findAll({ activeOnly, page });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}
