import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MatCardMdImage, MatCardModule, MatCard } from '@angular/material';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    MatCardModule,
    MaterialModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
      apollo: Apollo,
      httpLink: HttpLink
    ) {
      apollo.create({
        // By default, this client will send queries to the
        // `/graphql` endpoint on the same host
        link: httpLink.create({uri: 'http://localhost:3000/graphql'}),
        cache: new InMemoryCache()
      });
    }
}
