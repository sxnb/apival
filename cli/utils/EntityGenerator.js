/**
 * 
 */
class EntityGenerator {

    constructor(entities) {
        this.entities = entities;
    }

    //-------------------------------------------------------------------------

    generateEntity(name) {
        let entity = this.entities.find((el) => { return el.__apidoc_identifier === name; });

        if (!entity) {
            return null;
        }

        return this._generateEntityLevel(entity.__apidoc_properties);
    }

    //-------------------------------------------------------------------------

    _generateEntityLevel(properties) {
        let result = {};

        Object.keys(properties).forEach((key) => {
            if (properties[key].type === 'object') {
                result[key] = this._generateEntityLevel(properties[key].properties);
            } else if (properties[key].type === 'entity') {
                result[key] = this.generateEntity(properties[key].entityName);
            } else {
                result[key] = this._generateData(properties[key]);
            }
        });

        return result;
    }

    //-------------------------------------------------------------------------

    _generateData(data) {
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

}

module.exports = EntityGenerator;