import {Component, OnInit, ViewChild} from '@angular/core';
import {TabsetComponent} from 'ngx-bootstrap';
import {RequestService} from '../services/request.service';
import {EntityService} from "../services/entity.service";
import {EndpointService} from "../services/endpoint.service";

@Component({
    selector: 'app-caller',
    templateUrl: './caller.component.html',
    styleUrls: ['./caller.component.scss']
})
export class CallerComponent implements OnInit {
    @ViewChild('tabs') staticTabs: TabsetComponent;

    public entities = [];
    public endpoints = [];

    public request = {
        method: 'GET',
        body: '',
        url: 'http://192.168.33.10:9200',
        headers: [],
        response: null,
        error: null
    };

    public methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS'];

    constructor(public client: RequestService, public entityService: EntityService, public endpointService: EndpointService) {
    }

    ngOnInit() {
        this.entities = this.entityService.getEntityNames();
        this.endpoints = this.endpointService.getEndpoints();
        console.log(this.entityService.generateEntity('person'));
    }

    public addEntity(name) {
        const e = this.entityService.generateEntity(name);
        //console.log(this.entityService.generateEntity(name));
        this.request.body = JSON.stringify(e, null, 4);
    }

    public useEndpoint(endpoint) {
        this.request.url = endpoint.url;
        if (endpoint.method) {
            this.request.method = endpoint.method;
        }
    }

    public setMethod(method: string) {
        this.request.method = method;
    }

    public addHeader() {
        this.request.headers.push({name: '', value: ''});
    }

    public removeHeader(i: number) {
        this.request.headers.splice(i, 1);
    }

    public send() {
        /*
            this.request.response = {
                "simple key": "simple value",
                "numbers": 1234567,
                "simple list": [
                    "value1",
                    22222,
                    "value3"
                ],
                "owner": null,
                "simple obect": {
                    "simple key": "simple value",
                    "numbers": 1234567,
                    "simple list": [
                        "value1",
                        22222,
                        "value3"
                    ],
                    "simple obect": {
                        "key1": "value1",
                        "key2": 22222,
                        "key3": "value3"
                    }
                }
            };
        */

        this.request.response = '';
        this.request.error = '';

        setTimeout(() => {
            this.staticTabs.tabs[2].active = true;
        }, 0);

        this.client.call(this.request.method, this.request.url, this.request.body, this.request.headers).subscribe(
            data => {
                this.request.response = data;
            },
            error => {

                console.log(error);
                this.request.error = error;
            });
    }

    public getStringifiedError() {
        if (!this.request.error) {
            return '';
        }

        return JSON.stringify(this.request.error);
    }
}
