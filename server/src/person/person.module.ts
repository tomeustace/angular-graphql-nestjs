import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from './person.entity';
import { PersonResolver } from 'person/person.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonService, PersonResolver],
  controllers: [PersonController],
})
export class PersonModule {}