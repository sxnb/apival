const _ = require('lodash');

/**
 * 
 */
class Checker {
    
    constructor() {}

    //-------------------------------------------------------------------------

    static getInstance() {
        if (Checker.instance) {
            return Checker.instance;
        }

        Checker.instance = new this();
        return Checker.instance;
    }

    //-------------------------------------------------------------------------

    typeCheck(text, type) {
        switch(type) {
            case 'json':
            if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                return true;
            }
            
            return false;
            default:
                return false;
        }
    }

    //-------------------------------------------------------------------------

    statusCheck(a, b) {
        return parseInt(a) === parseInt(b);
    }

    //-------------------------------------------------------------------------

    propertyCheck(data, expectedValue, propertyPath) {
        const propertyValue = _.get(data, propertyPath, '__apidoc_invalid_value');
        return this.equals(propertyValue, expectedValue); 
    }

    //-------------------------------------------------------------------------

    equals(a, b) {
        return a == b;
    }

    //-------------------------------------------------------------------------

    equalsStrong(a, b) {
        return a === b;
    }

}

module.exports = Checker;