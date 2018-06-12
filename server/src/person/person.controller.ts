import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(): Promise<Person[]> {
    console.log('PersonController#findAll');
    return this.personService.findAll();
  }

  @Post()
  public async create(@Body() person: Person): Promise<Person> {
    return await this.personService.create(person);
  }

}