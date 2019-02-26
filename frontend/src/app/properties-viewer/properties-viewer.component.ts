import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'properties-viewer',
    templateUrl: './properties-viewer.component.html',
    styleUrls: ['./properties-viewer.component.scss']
})
export class PropertiesViewerComponent implements OnInit {

    @Input('properties')
    public properties: any;

    constructor() {
    }

    ngOnInit() {
    }

    public comparator(a, b) {
        return a;
    }
}
