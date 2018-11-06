import { Component, OnInit } from '@angular/core';
import { EndpointService } from '../services/endpoint.service';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent implements OnInit {

    public endpoints = [];

    public methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS'];

    constructor(public endpointService: EndpointService) {
    }

    ngOnInit() {
        this.endpoints = this.endpointService.getEndpoints();
    }

    public addEndpoint() {
      this.endpointService.endpoints.push({
          method: 'GET',
          url: 'http',
          id: ''
      });
    }

    public deleteEndpoint(id) {
      this.endpointService.endpoints.splice(id, 1);
    }

}
