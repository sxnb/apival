import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

    @Input('rules')
    public rules;

    public ruleTypes = [ 'status', 'type', 'property' ];

    constructor() {
        if (this.rules) {
            this.rules = [];
        }
    }

    ngOnInit() {
    }

    public addRule() {
        this.rules.push({type: 'property', expectedValue: '', propertyPath: null})
    }

    public deleteRule(id) {
        this.rules.splice(id, 1);
    }

}
