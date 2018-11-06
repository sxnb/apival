import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  public endpoints = [];

  constructor() {
    this.endpoints = [
        {
            id: 'personCreate',
            url: 'http://192.168.33.10:9200/api/person/create',
            method: 'PUT'
        },
        {
            id: 'personDelete',
            url: 'http://192.168.33.10:9200/api/person/delete',
            method: 'DELETE'
        },
        {
            id: '',
            url: 'http://192.168.33.10:9200/api/person',
            method: 'POST'
        }
    ]
  }

  public getEndpoints() {
      return this.endpoints;
  }
}
