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
    public data: any;

    constructor(public endpointService: EndpointService, public entityService: EntityService) {
        if (!this.data) {
            this.data = {};
        }
    }

    ngOnInit() {
    }

}
