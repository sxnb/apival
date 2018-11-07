import { Component, OnInit } from '@angular/core';
import {RequestService} from "../services/request.service";
import {EntityService} from "../services/entity.service";
import {EndpointService} from "../services/endpoint.service";
import {TestService} from "../services/test.service";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
    public entities = [];
    public endpoints = [];
    public tests = [];

    public editedTest: any = {

    };

    constructor(public client: RequestService, public entityService: EntityService, public endpointService: EndpointService, public testService: TestService) {
    }

    ngOnInit() {
        this.entities = this.entityService.getEntityNames();
        this.endpoints = this.endpointService.getEndpoints();
        this.tests = this.testService.getTests();
    }

    public editTest(test) {
        this.editedTest = test;
    }

    public getRawEditedTest() {
        return JSON.stringify(this.editedTest, null, 4);
    }

    public updateEditedTest(ev: any) {
        let data = null;
        try {
            data = JSON.parse(ev.srcElement.value);
        } catch(e) {
            alert('Invalid JSON.');
            return;
        }

        this.editedTest = data;
    }

    public addRequest() {
        this.editedTest.steps.push({ 'type': 'request' });
    }

    public addValidation() {
        this.editedTest.steps.push({ 'type': 'validation' });
    }

    public cloneComponent(id) {
        let clone = JSON.parse(JSON.stringify(this.editedTest.steps[id]));
        this.editedTest.steps.push(clone);
    }

    public deleteComponent(id) {
        this.editedTest.steps.splice(id, 1);
    }

}
