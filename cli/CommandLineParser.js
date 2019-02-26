const commandLineArgs = require('command-line-args');

class CommandLineParser {
    constructor() {
        const optionDefinitions = [
            { name: 'input', alias: 'i', type: String },
            { name: 'output', alias: 'o', type: String },
            { name: 'silent', alias: 's', type: Boolean },
            { name: 'help', alias: 'h', type: Boolean }
        ];

        this.options = commandLineArgs(optionDefinitions);
    }

    getParams() {
        return this.options;
    }
}

module.exports = CommandLineParser;