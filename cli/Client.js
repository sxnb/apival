const fs = require('fs');
const path = require('path');
const rp = require('request-promise');
const commandLineUsage = require('command-line-usage');

const Logger = require('./Logger').getInstance();

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

        this.filePath = path.join(__dirname, this.options.input);
        const content = fs.readFileSync(this.filePath);
        try {
            this.content = JSON.parse(content);
        } catch(e) {
            Logger.fatal('Invalid input file/JSON.');
            process.exit(1);
        }

    }

    showHelp() {
        console.log(this.usage);
    }

    async runTests() {
        this.results = {
            success: [],
            fail: []
        };

        Logger.l('=== ' + this.content.tests.length + ' tests ===');
        for (let i = 0; i < this.content.tests.length; i++) {
            await this._runTest(this.content.tests[i]); 
        }

        this._printResults();

        return this.results;
    }

    runTestByName() {
        Logger.l('=== ' + this.content.tests.length + ' tests ===');
    }

    async _runTest(test) {
        Logger.l('Running test << ' + test.name + ' >>');
        console.log(JSON.stringify(test, null, 4));

        let promises = [];
        for (let s = 0; s < test.steps.length; s++) {
            if (test.steps[s].type === 'request') {
                continue;
            }
            if (test.steps[s].type === 'validation') {
                continue;
            }

            Logger.fatal('Invalid test step ' + test.steps[s].type);
        }
    }

    async _addRequestPromise(request) {

    }

    _printResults() {
        Logger.l('\n=== Test results ===');
        Logger.s(this.results.success.length + ' succeeded');
        Logger.e(this.results.fail.length + ' failed');
        if (this.results.fail.length) {
            Logger.e('\nResult: FAIL');
            return;
        }

        Logger.s('\nResult: SUCCESS');
    }
}

module.exports = Client;