import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { AppComponent } from './app.component';
import { CallerComponent } from './caller/caller.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RequestHeaderComponent } from './request-header/request-header.component';

import { RequestService } from './services/request.service';

/* Route definitions */
const appRoutes: Routes = [
    { path: 'home', component: CallerComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CallerComponent,
    PageNotFoundComponent,
    RequestHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxJsonViewerModule
  ],
  providers: [
      RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
