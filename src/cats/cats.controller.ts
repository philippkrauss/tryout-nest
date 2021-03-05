import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode, HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Response, Request } from 'express';

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('test')
  findTest(): Object {
    return { response: 'hello' };
  }

  @Get('test2')
  findTest2(@Res() response: Response, @Req() request: Request): Response {
    return response.status(200).send('test2');
  }

  @Get('query')
  findQuery(@Query('test') test: String): String {
    return test;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'This action adds a new cat with name ' + createCatDto.name;
  }

  @Get('ab?cd')
  @Header('Custom-Header', 'custom-value')
  @Redirect('/query')
  wildcard(@Res() response: Response): Object {
    return null;
    // response.header('another-custom-header', 'another-custom-value')
    // response.send('This route uses a wildcard');
  }

  @Get('passthrough')
  async doPassthrough(@Res({ passthrough: true }) res: Response): Promise<string> {
    res.header('my-custom-header', 'my-custom-value');
    return 'This is a response';
  }

  value = 0;
  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(this.value++);
    return `This action returns a #${id} cat`;
  }
}
