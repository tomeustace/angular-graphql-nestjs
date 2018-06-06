import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Connection, EntityManager, Repository } from "typeorm";
import { Person } from "person/person.entity";

@Injectable()
export class PersonService {
  constructor( 
    @InjectRepository(Person) 
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async updateFirstName(id: number, name: string): Promise<any> {
    let personToUpdate = await this.personRepository.findOne(1);
    personToUpdate.firstName = "Me, my friends and polar bears";
    return await this.personRepository.save(personToUpdate);
  }

  async create(person: Person): Promise<Person> {
    console.log('PersonService#create', person);
    return await this.personRepository.save(person);
  }

}