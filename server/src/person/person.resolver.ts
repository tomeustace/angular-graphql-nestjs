import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { find, filter } from 'lodash';
import { PersonService } from 'person/person.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Person } from './person.entity';

@Resolver('Person')
export class PersonResolver {

  personService: PersonService;

  constructor(personService: PersonService) {
      this.personService = personService;
  }

  @Query('person')
  getPerson(obj, args, context, info) {
    console.log('PersonResolver#getPerson', args)
    return this.personService.find(args.lastName);
  }

  @Mutation()
  async createPerson(_, { firstName, lastName }): Promise<Person|void> {
    console.log('PersonResolver#createPerson', firstName, lastName);
    let pt = new Person();
    pt.firstName = firstName;
    pt.lastName = lastName;
    return await this.personService.create(pt);
  }

  @Mutation()
  async deletePerson(_, { lastName }): Promise<Person|void> {
    console.log('PersonResolver#deletePerson', lastName );
    return await this.personService.deletePerson(lastName);
  }

  @Mutation()
  async updateLastName(_, { oldLastName, newLastName }): Promise<Person|void> {
    console.log('PersonResolver#updateLastName', oldLastName, newLastName);
    return await this.personService.updateLastName(oldLastName, newLastName);
  }
}