import {Component, Input, OnInit} from '@angular/core';
import {EndpointService} from "../services/endpoint.service";
import {EntityService} from "../services/entity.service";

@Component({
    selector: 'request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

    @Input('data')
    public request: any = {};

    public endpointOptions: any = [];
    public bodyOptions: any = [];

    public methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS'];

    constructor(public endpointService: EndpointService, public entityService: EntityService) {
        if (!this.request) {
            this.request = {};
        }

        this.bodyOptions = JSON.parse(JSON.stringify(entityService.getEntities()));
        this.bodyOptions.push({
          __apidoc_identifier: '__apidoc_custom_body'
        });

        this.endpointOptions = endpointService.getEndpoints().filter((e: any) => { return e.id; });
        this.endpointOptions.push({
          id: '__apidoc_custom_endpoint',
          url: 'Custom URL'
        })
    }

    ngOnInit() {
    }

    public addHeader() {
        if (!this.request.headers) {
          this.request.headers = [];
        }
        this.request.headers.push({name: '', value: ''});
    }

    public removeHeader(i: number) {
        this.request.headers.splice(i, 1);
    }

    public getRequestMethod() {
      if (!this.request.endpoint) {
        return;
      }

      return this.endpointOptions.find((e: any) => { return e.id === this.request.endpoint; }).method;
    }

    public setCustomMethod(m: any) {
      this.request.endpointCustomMethod = m;
    }

}
