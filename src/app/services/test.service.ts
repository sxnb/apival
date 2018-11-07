import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    public tests = [];

    constructor() {
        let e1 = {
            name: 'Authentication Test #1',
            description: 'Authenticates a user',
            steps: [
                {
                    type: 'request'
                },
                {
                    type: 'request'
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
    }

    public getTests() {
        return this.tests;
    }

}
