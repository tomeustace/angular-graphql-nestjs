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

  async find(lastName): Promise<Person> {
    return await this.personRepository.findOne({lastName: lastName});
  }

  async updateLastName(oldName: string, newName: string): Promise<any> {
    let personToUpdate = await this.personRepository.findOne({lastName: oldName});
    personToUpdate.lastName = newName;
    return await this.personRepository.save(personToUpdate);
  }

  async deletePerson(lastName: string): Promise<any> {
    let personToDelete = await this.personRepository.findOne({lastName: lastName});
    return await this.personRepository.delete(personToDelete);
  }

  async create(person: Person): Promise<Person> {
    console.log('PersonService#create', person);
    return await this.personRepository.save(person);
  }

}