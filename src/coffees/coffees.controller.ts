import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery): Coffee[] {
    // findAll(@Res() response) {
    // response.status(200).send('This method returns all coffees');
    // return `This method returns all coffees, paginationQuery: ${JSON.stringify(
    //   paginationQuery,
    // )}`;
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Coffee {
    return this.coffeesService.findOne(+id);
  }

  @Post()
  create(@Body() body: CreateCoffeeDto): CreateCoffeeDto {
    return this.coffeesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto): void {
    return this.coffeesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.coffeesService.delete(+id);
  }
}
