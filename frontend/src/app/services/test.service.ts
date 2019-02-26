import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    public tests = [];

    constructor() {
/*
        let e1 = {
            __apidoc_identifier: '24479525-aada-479f-bde0-010c06c09888'
            name: 'Authentication Test #1',
            description: 'Authenticates a user',
            steps: [
                {
                    type: 'request',
                    data: {}
                },
                {
                    type: 'request',
                    data: {}
                },
                {
                    type: 'validation',
                    rules: [
                        {
                            type: 'status',
                            expectedValue: 200
                        },
                        {
                            type: 'type',
                            expectedValue: 'json'
                        },
                        {
                            type: 'property',
                            propertyPath: 'response.success',
                            expectedValue: true
                        }
                    ]
                }
            ]
        };

        this.tests.push(e1);
*/
    }

    public getTests() {
        return this.tests;
    }

    public setTests(tests: any) {
        this.tests = tests;
    }

}
