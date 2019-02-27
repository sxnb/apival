const rp = require('request-promise-native');
const _ = require('lodash');
const BaseStep = require('./BaseStep');
const EntityGenerator = require('../utils/EntityGenerator');
const Logger = require('../utils/Logger').getInstance();

/**
 * 
 */
class RequestStep extends BaseStep {

    constructor(stepData, idx, entities, endpoints) {
        super(stepData, idx, entities, endpoints);
        this.stepData = stepData.data;
        this.entityGenerator = new EntityGenerator(entities);
    }

    //-------------------------------------------------------------------------

    async process(previousResults) {
        this.previousResults = previousResults;

        const endpoint = this._getRequestUri();
        let options = {
            uri: endpoint.url,
            method: endpoint.method,
            headers: this._getRequestHeaders(),
            resolveWithFullResponse: true,
            json: true
        };

        const body = this._getRequestBody();
        if (body) {
            options.body = body;
        }

        try {
            let response = await rp(options);
            this.result.output = response.body;
            this.result.statusCode = response.statusCode;
            this.result.headers = response.headers;
            
            this.result.success = true;
        } catch(err) {
            console.log(err);
            Logger.e(err.message);
            this.result.success = false;
        }
    }

    //-------------------------------------------------------------------------

    getResult() {
        return this.result;
    }

    //-------------------------------------------------------------------------

    _getRequestUri() {
        if (this.stepData.endpointId === '__apidoc_custom_endpoint') {
            return {
                method: this.stepData.endpointCustomMethod,
                url: this._replaceStringPlaceholders(this.stepData.endpointCustomUrl)
            };
        } else {
            const endpoint = this.endpoints.find((e) => { return e.id === this.stepData.endpointId; });
            if (!endpoint) {
                Logger.fatal('Invalid endpoint.');
            }

            return {
                method: endpoint.method,
                url: endpoint.url
            };
        }
    }

    //-------------------------------------------------------------------------

    _getRequestHeaders() {
        let headers = {};
        if (!this.stepData.headers) {
            return headers;
        }

        this.stepData.headers.forEach((h) => {
            if (h.name) {
                headers[h.name] = this._replaceStringPlaceholders(h.value);
            }
        });

        return headers;
    }
    //-------------------------------------------------------------------------

    _getRequestBody() {
        if (this.stepData.bodyType === '__apidoc_custom_body') {
            let body = null;
            try {
                body = JSON.parse(this._replaceStringPlaceholders(this.stepData.bodyCustom));
            } catch(e) {}

            return body;
        }

        return this.entityGenerator.generateEntity(this.stepData.bodyType);
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

module.exports = RequestStep;