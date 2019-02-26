const CommandLineParser = require('./CommandLineParser');
const Logger = require('./Logger');
const Client = require('./Client');

const clp = new CommandLineParser();
const options = clp.getParams();

let client = new Client(options);

if (options['help']) {
    client.showHelp();
    return;
}

if (!options['input']) {
    Logger.getInstance().fatal('You must provide an input file.');
}

if (options['test-name']) {
    client.runTestByName(options['test-name']);
    return;
}

client.runTests();