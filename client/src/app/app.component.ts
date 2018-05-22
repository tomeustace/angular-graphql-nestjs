import { Component, HostListener, HostBinding, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  apollo: Apollo;
  photo: any;

  constructor(apollo: Apollo) {
    this.apollo = apollo;
  }

  @HostBinding('style.color') color: string;
  @HostBinding('style.border-color') borderColor: string;

  ngOnInit() {
    this.color = 'green';
    this.borderColor = 'red';
  }

  getPhoto() {
    this.apollo.query({query: gql`{ photo(id: 2) {
      name,
      id
    } }`}).subscribe((res: any) => {
      return this.photo = res.data.photo;
    });
  }
}
