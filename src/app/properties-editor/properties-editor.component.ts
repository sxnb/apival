import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'properties-editor',
    templateUrl: './properties-editor.component.html',
    styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit {

    @Input('properties')
    public properties: any;

    public types = [ 'entity', 'integer', 'float', 'object', 'string', 'regex' ];

    constructor() {
    }

    ngOnInit() {
    }

    public updateKey(e, oldKey) {
        if (!e.srcElement.value) {
            e.srcElement.value = oldKey;
            alert("Property name cannot be empty");
            return;
        }
        delete Object.assign(this.properties, {[e.srcElement.value]: this.properties[oldKey] })[oldKey];
    }

    public addProperty() {
        let s = '';
        while (s.length < 32) s += Math.random().toString(36).substr(2, 32 - s.length);

        this.properties[s] = { type: 'integer', min: 0, max: 10 };
        console.log(this.properties);
    }

    public comparator(a, b) {
        return a;
    }
}
