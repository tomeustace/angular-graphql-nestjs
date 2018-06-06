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
    return this.personService.findAll().then(phs => {
      const resp = find(phs, { lastName: args.lastName });
      let person = new Person();
      person.firstName = resp.firstName;
      person.lastName = resp.lastName;
      person.id = resp.id; 
      return person;
    });
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
  async updateFirstName(_, { id, name }): Promise<Person|void> {
    console.log('PersonResolver#updateName', id, name);
    return await this.personService.updateFirstName(id, name);
  }
}