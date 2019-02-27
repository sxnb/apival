const CommandLineParser = require('./utils/CommandLineParser');
const Logger = require('./utils/Logger');
const Client = require('./Client');

const clp = new CommandLineParser();
const options = clp.getParams();

let client = new Client(options);

if (options['help']) {
    client.showHelp();
    process.exit(0);
}

if (!options['input']) {
    Logger.getInstance().fatal('You must provide an input file.');
}

if (options['test-name']) {
    client.runTestByName(options['test-name']);
    return;
}

client.runTests().then((results) => {
    if (results.fail.length) {
        process.exit(1);
    }

    process.exit(0);
});