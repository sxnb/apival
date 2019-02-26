const fs = require('fs');
const path = require('path');
const commandLineUsage = require('command-line-usage');

const Logger = require('./Logger');

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
            Logger.getInstance().fatal('Invalid input file/JSON.');
            process.exit(1);
        }

    }

    showHelp() {
        console.log(this.usage);
    }

    runTests() {
        Logger.getInstance().l('=== ' + this.content.tests.length + ' tests ===');
    }

    runTestByName() {
        Logger.getInstance().l('=== ' + this.content.tests.length + ' tests ===');
    }
}

module.exports = Client;