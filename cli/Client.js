const fs = require('fs');
const path = require('path');
const commandLineUsage = require('command-line-usage');

const Logger = require('./utils/Logger').getInstance();
const RequestStep = require('./validation/RequestStep');
const ValidationStep = require('./validation/ValidationStep');

/**
 * 
 */
class Client {

    constructor(options) {
        const sections = [
            {
                header: 'ApiVal CLI',
                content: 'ApiVal CLI allows you to run ApiVal automatic tests.'
            },
            {
                header: 'Options',
                optionList: [
                    {
                        name: 'input',
                        alias: 'i',
                        typeLabel: '{underline file}',
                        description: 'The JSON file to process.'
                    },
                    {
                        name: 'test-name',
                        alias: 't',
                        description: 'Run a specific test only.'
                    },
                    {
                        name: 'output',
                        alias: 'o',
                        typeLabel: '{underline file}',
                        description: 'The name of the output file.'
                    },
                    {
                        name: 'silent',
                        alias: 's',
                        description: 'Run the tool in silent mode, i.e. no output.'
                    },
                    {
                        name: 'help',
                        alias: 'h',
                        description: 'Print this usage guide.'
                    }
                ]
            }
        ];
        
        this.options = options;
        this.usage = commandLineUsage(sections);

        if (options.help) {
            return;
        }

        if (options.silent) {
            Logger.setSilent();
        }

        this.results = {
            success: [],
            fail: []
        };

        this.filePath = path.join(__dirname, this.options.input);
        const content = fs.readFileSync(this.filePath);
        try {
            this.content = JSON.parse(content);
        } catch(e) {
            Logger.fatal('Invalid input file/JSON.');
            process.exit(1);
        }

    }

    //-------------------------------------------------------------------------

    showHelp() {
        console.log(this.usage);
    }

    //-------------------------------------------------------------------------

    async runTests() {
        Logger.l('=== ' + this.content.tests.length + ' tests ===');
        for (let i = 0; i < this.content.tests.length; i++) {
            await this._runTest(this.content.tests[i]); 
        }

        this._printResults();

        return this.results;
    }

    //-------------------------------------------------------------------------

    runTestByName() {
        Logger.l('=== ' + this.content.tests.length + ' tests ===');
    }

    //-------------------------------------------------------------------------

    async _runTest(test) {
        Logger.l('Running test << ' + test.name + ' >>');
        // console.log(JSON.stringify(test, null, 4));

        let steps = [];
        let testName = '';
        for (let s = 0; s < test.steps.length; s++) {
            if (test.steps[s].type === 'request') {
                steps.push(new RequestStep(test.steps[s],
                                           s,
                                           this.content.entities,
                                           this.content.endpoints));
                continue;
            }

            if (test.steps[s].type === 'validation') {
                steps.push(new ValidationStep(test.steps[s],
                                              s, 
                                              this.content.entities,
                                              this.content.endpoints));
                   continue;
            }

            Logger.fatal('Invalid test step ' + test.steps[s].type);
        }

        let previousResults = [];
        for (let p = 0; p < steps.length; p++) {
            Logger.i(`\nStep ${p+1} (${test.steps[p].type})`);
            await steps[p].process(previousResults);
            let stepResult = steps[p].getResult();
            if (stepResult.success) {
                this.results.success.push(stepResult);
            } else {
                this.results.fail.push(stepResult);
            }

            previousResults.push(stepResult);
            testName = 'Step ' + (p + 1) + ' (' + stepResult.type + ')';

            this._printStepResult(testName, stepResult);
        }


    }

    //-------------------------------------------------------------------------

    async _addRequestStep(request) {
        return new RequestStep(request);        
    }

    //-------------------------------------------------------------------------

    async _addValidationStep(validation) {
        return new ValidationStep(validation);        
    }

    //-------------------------------------------------------------------------

    _printStepResult(name, stepResult) {
        if (stepResult.success) {
            Logger.s(name + ' succeeded');
        } else {
            Logger.e(name + ' failed');
        }
    }

    //-------------------------------------------------------------------------

    _printResults() {
        Logger.l('\n=== Test results ===');
        Logger.s(this.results.success.length + ' succeeded');
        Logger.e(this.results.fail.length + ' failed');
        if (this.results.fail.length) {
            Logger.e('\nResult: FAILED');
            return;
        }

        Logger.s('\nResult: SUCCESS');
    }

}

module.exports = Client;