const _ = require('lodash');
const BaseStep = require('./BaseStep');
const Checker = require('./Checker').getInstance();
const Logger = require('../utils/Logger').getInstance();

/**
 * 
 */
class ValidationStep extends BaseStep {
    
    async process(previousResults) {
        this.previousResults = previousResults;

        this.dataToValidate = previousResults[this.idx - 1];
        // console.log(dataToValidate);
        // console.log(this.stepData.rules);
        this.result.success = true;

        this.stepData.rules.forEach((rule) => {
            switch (rule.type) {
                case 'status':
                    if (!Checker.statusCheck(rule.expectedValue, this.dataToValidate.statusCode)) {
                        Logger.e(`- Status check failed - expected ${rule.expectedValue}, got ${this.dataToValidate.statusCode}`);
                        this.result.success = false;
                    } else {
                        Logger.s(`- Status check succeeded`); 
                    }
                    break;
                case 'type':
                    if (!Checker.typeCheck(this.dataToValidate.output, rule.expectedValue)) {
                        Logger.e(`- Type check failed - expected ${rule.expectedValue}`);
                        this.result.success = false;
                    } else {
                        Logger.s(`- Type check succeeded`); 
                    }
                    break;
                case 'property':
                    if (!Checker.propertyCheck(this.dataToValidate.output, rule.expectedValue, rule.propertyPath)) {
                        Logger.e(`- Property "${rule.propertyPath}" check failed - expected "` + 
                        `${rule.expectedValue}", got "${_.get(this.dataToValidate.output, rule.propertyPath)}"`);
                        this.result.success = false;
                    } else {
                        Logger.s(`- Property "${rule.propertyPath}" check succeeded`); 
                    }
                    break;
            }
        });

    }

    //-------------------------------------------------------------------------

    getResult() {
        return this.result;
    }

    //-------------------------------------------------------------------------

    _replaceStringPlaceholders(s) {
        let regex = /_:[0-9]:[a-zA-Z0-9._]*:_/gm;
        
        let newString = s.replace(regex, (match, capture) => {
            const elements = match.split(':');
            const step = elements[1];
            const propertyPath = elements[2];

            return _.get(this.previousResults[step - 1] ? this.previousResults[step - 1].output : {}, propertyPath, '');
        });

        return newString;
    }

}

module.exports = ValidationStep;