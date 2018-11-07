import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { CallerComponent } from './caller/caller.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RequestHeaderComponent } from './request-header/request-header.component';

import { RequestService } from './services/request.service';
import { EndpointsComponent } from './endpoints/endpoints.component';
import { EntitiesComponent } from './entities/entities.component';
import { TestsComponent } from './tests/tests.component';
import { EntityEditorComponent } from './entity-editor/entity-editor.component';
import { EntityViewerComponent } from './entity-viewer/entity-viewer.component';
import { PropertiesViewerComponent } from './properties-viewer/properties-viewer.component';
import { PropertiesEditorComponent } from './properties-editor/properties-editor.component';
import { KeyvalueUnsortedPipe } from './keyvalue-unsorted.pipe';
import { RequestComponent } from './request/request.component';
import { ValidationComponent } from './validation/validation.component';

/* Route definitions */
const appRoutes: Routes = [
    { path: 'home', component: CallerComponent },
    { path: 'endpoints', component: EndpointsComponent },
    { path: 'entities', component: EntitiesComponent },
    { path: 'tests', component: TestsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CallerComponent,
    PageNotFoundComponent,
    RequestHeaderComponent,
    EndpointsComponent,
    EntitiesComponent,
    TestsComponent,
    EntityEditorComponent,
    EntityViewerComponent,
    PropertiesViewerComponent,
    PropertiesEditorComponent,
    KeyvalueUnsortedPipe,
    RequestComponent,
    ValidationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    SortablejsModule.forRoot({ animation: 150 }),
    NgxJsonViewerModule
  ],
  providers: [
      RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
