import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RequestService } from "../services/request.service";
import { EntityService } from "../services/entity.service";
import { EndpointService } from "../services/endpoint.service";
import { TestService } from "../services/test.service";
import * as uuidv4 from 'uuid/v4';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
    public entities = [];
    public endpoints = [];
    public tests = [];

    public renaming: boolean = false;

    modalRef: BsModalRef;

    public editedTest: any = {

    };

    constructor(private modalService: BsModalService, public client: RequestService,
                public entityService: EntityService, public endpointService: EndpointService, public testService: TestService) {
    }

    ngOnInit() {
        this.entities = this.entityService.getEntityNames();
        this.endpoints = this.endpointService.getEndpoints();
        this.tests = this.testService.getTests();
    }

    public addTest() {
        this.tests.push({
            __apidoc_identifier: uuidv4(),
            name: 'New Test',
            description: '',
            steps: []
        });
    }

    public editTest(test) {
        this.renaming = false;
        this.editedTest = test;
    }

    public getRawEditedTest() {
        return JSON.stringify(this.editedTest, null, 4);
    }

    toggleRenaming() {
      this.renaming = !this.renaming;
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
        this.editedTest.steps.push({ type: 'request', data: {} });
    }

    public addValidation() {
        this.editedTest.steps.push({ type: 'validation', rules: [] });
    }

    public cloneComponent(id) {
        let clone = JSON.parse(JSON.stringify(this.editedTest.steps[id]));
        this.editedTest.steps.push(clone);
    }

    public deleteComponent(id) {
        this.editedTest.steps.splice(id, 1);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmDeleteTest(): void {
        this.testService.setTests(this.tests.filter((t: any) => {
          return t.__apidoc_identifier !== this.editedTest.__apidoc_identifier;
        }));

        this.editedTest = {};
        this.tests = this.testService.getTests();
        this.renaming = false;
        this.modalRef.hide();
    }

    cancelDeleteTest(): void {
        this.modalRef.hide();
    }
}
