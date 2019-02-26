import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'entity-editor',
    templateUrl: './entity-editor.component.html',
    styleUrls: ['./entity-editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

    @Input('entity')
    public entity: any;

    public localEntity: any;

    constructor() {
    }

    ngOnInit() {
        this.localEntity = JSON.parse(JSON.stringify(this.entity));
    }

    public saveProperties() {
        console.log(this.entity.__apidoc_properties);
    }

}
