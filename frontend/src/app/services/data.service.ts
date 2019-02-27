import { Injectable } from '@angular/core';
import { EntityService } from './entity.service';
import {EndpointService} from "./endpoint.service";
import {TestService} from "./test.service";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public lastTimestamp: string = '';
  public oldState: string = '';

  public interval: any = null;

  constructor(public entityService: EntityService, public endpointService: EndpointService, public testService: TestService) {
      this.lastTimestamp = localStorage.getItem('__apival_timestamp');

      this.oldState = JSON.stringify(this.export());

      this.interval = setInterval(() => {
        this.dumpToStorage();
      }, 10000);
  }

  public import(d: string) {
      let data = JSON.parse(d);
      this.testService.setTests(data.tests);
      this.entityService.setEntities(data.entities);
      this.endpointService.setEndpoints(data.endpoints);
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

  public prettyLastAutosave() {
    return this.lastTimestamp ? moment(this.lastTimestamp).format('h:mm:ss a') : 'never';
  }

  public dumpToStorage() {
      let d = JSON.stringify(this.export());
      if (this.oldState === d) {
          return;
      }

      this.oldState = d;

      localStorage.setItem('__apival_data', d);
      localStorage.setItem('__apival_timestamp', (new Date()).toString());
      this.lastTimestamp = localStorage.getItem('__apival_timestamp');
  }

  public restoreFromStorage() {
      let d = localStorage.getItem('__apival_data');
      if (d) {
        this.import(d);
      }
  }

}
