import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {EntityService} from '../services/entity.service';

@Component({
    selector: 'app-entities',
    templateUrl: './entities.component.html',
    styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

    public x = {a: 1}; // dummyEntity, for some reason ngx-json-viewer crashes when using this variable name
    public rawDummyEntity = '';

    public dummyEntityName = '';

    modalRef: BsModalRef;

    constructor(private modalService: BsModalService, public entityService: EntityService) {
    }

    ngOnInit() {
    }

    public addEntity() {
        this.entityService.entities.push({
            __apidoc_identifier: '',
            __apidoc_properties: {}
        });
    }

    public deleteEntity(id) {
        this.entityService.entities.splice(id, 1);
    }

    public generate(template: TemplateRef<any>, name) {
        this.dummyEntityName = name;
        this.rawDummyEntity = JSON.stringify(this.entityService.generateEntity(name), null, 4);

        this.x = JSON.parse(this.rawDummyEntity);

        // console.log(this.rawDummyEntity);
        // this.dummyEntity = JSON.parse(this.rawDummyEntity);

        if (template) {
            this.modalRef = this.modalService.show(template);
        }
    }

}
