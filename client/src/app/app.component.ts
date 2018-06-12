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
  person: Person;
  personCreated = false;
  personDeleted = false;
  personUpdated = false;
  personNotFound = false;
  updatedLastName: string;

  constructor(apollo: Apollo, http: HttpClient) {
    this.apollo = apollo;
    this.http = http;
  }

  ngOnInit() { }

  findPerson(lastName) {
    this.reset();
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
    }).subscribe(
      (res: any) => {
        if (res.data.person === null) {
          return this.personNotFound = true;
        }
        return this.person = res.data.person;
      },
      (err) => {
        return this.personNotFound = true;
      }
    );
  }

  createPerson(firstName, lastName) {
    this.reset();
    const create = gql`
      mutation create($firstName: String!, $lastName: String!) {
        createPerson(firstName: $firstName, lastName: $lastName) {
          firstName,
          lastName
        }}`;
    
    this.apollo.mutate({
      mutation: create,
      variables: { firstName: firstName, lastName: lastName },
    }).subscribe((res: any) => {
      this.personCreated = true;
    });
  }

  deletePerson(lastName) {
    this.reset();
    const deleteP = gql`
      mutation delete($lastName: String!) {
        deletePerson(lastName: $lastName) {
          lastName 
        }}`;

    this.apollo.mutate({
      mutation: deleteP,
      variables: { lastName: lastName },
    }).subscribe(res => {
      this.personDeleted = true;
    });
  }

  updatePerson(oldLastName, newLastName) {
    this.reset();
    const update = gql`
      mutation update($oldLastName: String!, $newLastName: String!) {
        updateLastName(oldLastName: $oldLastName, newLastName: $newLastName) {
          lastName 
        }}`;

    this.apollo.mutate({
      mutation: update,
      variables: { oldLastName: oldLastName, newLastName: newLastName },
    }).subscribe(res => {
      this.personUpdated = true;
      let ls = res.data.updateLastName.lastName;
      this.updatedLastName = ls; 
    });
  }

  reset() {
    this.person = undefined;
    this.personNotFound = false;
  }
}
