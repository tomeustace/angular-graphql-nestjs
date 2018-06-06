import { Component, HostListener, HostBinding, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Person } from '../models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  http: HttpClient;
  apollo: Apollo;
  person: any;
  personCreated = false;

  constructor(apollo: Apollo, http: HttpClient) {
    this.apollo = apollo;
    this.http = http;
  }

  ngOnInit() { }

  findPerson(lastName) {
    const findPerson = gql`
      query findPerson($lastName: String!) {
        person(lastName: $lastName) {
          lastName,
          firstName,
          id
        }}`
    
    this.apollo.query({
      query: findPerson,
      variables: { lastName: lastName },
    }).subscribe((res: any) => {
      return this.person = res.data.person;
    });
  }

  createPerson(firstName, lastName) {
    const create = gql`
      mutation create($firstName: String!, $lastName: String!) {
        createPerson(firstName: $firstName, lastName: $lastName) {
          firstName,
          lastName
        }
      }`;
    
    this.apollo.mutate({
      mutation: create,
      variables: { firstName: firstName, lastName: lastName },
    }).subscribe((res: any) => {
      this.personCreated = true;
    });
  }

  updatePerson() {
    const update = gql`
      mutation update {
        updateName(name: $name) {
          name 
        }
      }`;

    this.apollo.mutate({
      mutation: update
    }).subscribe(res => console.log('ho ho'));
  }

  removePerson() {

  }

}
