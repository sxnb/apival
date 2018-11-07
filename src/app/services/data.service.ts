import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import {EndpointService} from "./endpoint.service";
import {TestService} from "./test.service";
// import * as stringifyObject from 'stringify-object';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public entityService: EntityService, public endpointService: EndpointService, public testService: TestService) { }

  public import() {

  }

  public export() {
      let data = {
        entities: {},
          endpoints: [],
          tests: []
      };

      data.entities = this.entityService.dumpData();
      data.endpoints = this.endpointService.getEndpoints();
      data.tests = this.testService.getTests();


      return data;

      // console.log(data);
      //
      // let stringified = stringifyObject(data, { indent: '  ' });
      //
      // stringified = JSON.stringify(data);
      // console.log(stringified);
      //
      // let uri = "data:application/json;charset=UTF-8," + encodeURIComponent(stringified);
      // // let w = window.open('about:blank', "_blank");
      // // w.document.write(stringified);
      // // w.document.close();
      // // w.focus();
      // let w = window.open(uri, '_blank');
      // w.focus();
  }
}
