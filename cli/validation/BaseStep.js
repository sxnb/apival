/**
 * 
 */
class BaseStep {
    
    constructor(stepData, idx, entities, endpoints) {
        this.stepData = stepData;
        this.idx = idx;
        this.entities = entities;
        this.endpoints = endpoints;
        this.result = {
            type: stepData.type
        };
    }

    //-------------------------------------------------------------------------

    async process(previousResults) {
        throw new Error("Should be implemented in child class.");
    }

    //-------------------------------------------------------------------------

    getResult() {
        return this.result;
    }
    
}

module.exports = BaseStep;