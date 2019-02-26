import {Injectable} from '@angular/core';
import * as RandExp from 'randexp';

@Injectable({
    providedIn: 'root'
})
export class EntityService {

    public entities = [];

    constructor() {
/*
        let e1 = {
            __apidoc_identifier: 'person',
            __apidoc_version: 1,
            __apidoc_properties: {
                id: {
                    type: 'string',
                    length: 32
                },
                name: {
                    type: 'string',
                    length: 96
                },
                age: {
                    type: 'integer',
                    min: 0,
                    max: 100
                },
                phone: {
                    type: 'regex',
                    exp: '\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})'
                },
                score: {
                    type: 'float',
                    min: 0,
                    max: 10
                },
                address: {
                    type: 'object',
                    properties: {
                        'street': {
                            type: 'string',
                            length: 32
                        },
                        'number': {
                            type: 'integer',
                            min: 0,
                            max: 500
                        }
                    }
                },
                additionalInfo: {
                    type: 'entity',
                    entityName: 'additionalInfo'
                }
            }
        };

        let e2 = {
            __apidoc_identifier: 'additionalInfo',
            __apidoc_version: 1,
            __apidoc_properties: {
                property1: {
                    type: 'string',
                    length: 96
                },
                property2: {
                    type: 'integer',
                    min: 0,
                    max: 10
                }
            }
        };
        this.entities.push(e1);
        this.entities.push(e2);
*/
    }

    public getEntities() {
        return this.entities;
    }

    public getEntityNames() {
        return this.entities.map(el => el.__apidoc_identifier);
    }

    public generateEntity(name) {
        let entity = this.entities.find((el) => { return el.__apidoc_identifier === name; });

        if (!entity) {
            return {};
        }

        return this.generateEntityLevel(entity.__apidoc_properties);
    }

    public generateEntityLevel(properties) {
        let result = {};


        Object.keys(properties).forEach((key) => {
            if (properties[key].type === 'object') {
                result[key] = this.generateEntityLevel(properties[key].properties);
            } else if (properties[key].type === 'entity') {
                result[key] = this.generateEntity(properties[key].entityName);
            } else {
                result[key] = this.generateData(properties[key]);
            }
        });

        return result;
    }

    public generateData(data) {
        switch(data.type) {
            case 'string':
                let s = '';
                while (s.length < data.length) s += Math.random().toString(36).substr(2, data.length - s.length);
                return s;
            case 'integer':
                return Math.floor(Math.random() * (data.max - data.min + 1)) + data.min;
            case 'float':
                return Math.random() * (data.max - data.min) + data.min;
            case 'regex':
                return new RandExp(data.exp).gen();
        }
    }

    public dumpData() {
        return this.entities;
    }

    public setEntities(entities: any) {
        this.entities = entities;
    }
}
