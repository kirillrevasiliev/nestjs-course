import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Robust Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee | undefined {
    const coffee = this.coffees.find((c) => c.id === +id);
    if (!coffee) {
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): CreateCoffeeDto {
    const coffees = this.coffees;
    const id =
      coffees.sort((c1, c2) => {
        return c1.id > c2.id ? -1 : 1;
      })[0].id + 1;
    this.coffees.push({ id, ...createCoffeeDto });
    return createCoffeeDto;
  }

  update(id: number, createCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      this.coffees = this.coffees.map((c) => (c.id === id ? { ...c, ...createCoffeeDto, id } : c));
    }
  }

  delete(id: number) {
    const coffeeIndex = this.coffees.findIndex((c) => c.id === id);
    if (coffeeIndex !== -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
