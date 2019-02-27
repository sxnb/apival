class Logger {
    constructor() {}

    static getInstance() {
        if (Logger.instance) {
            return Logger.instance;
        }

        Logger.instance = new this();
        return Logger.instance;
    }

    /**
     * Error log
     * @param {Error} s 
     */
    e(s) {
        console.log('\x1b[31m%s\x1b[0m', s);
    }

    /**
     * Fatal log (error + exit)
     * @param {*} s 
     */
    fatal(s) {
        this.e(s);
        process.exit(1);
    }

    /**
     * Info log
     * @param {*} s 
     */
    i(s) {
        console.log('\x1b[36m%s\x1b[0m', s);
    }

    /**
     * Success log
     * @param {*} s 
     */
    s(s) {
        console.log('\x1b[32m%s\x1b[0m', s);
    }

    /**
     * Log
     * @param {*} s 
     */
    l(s) {
        console.log(s);
    }

}

module.exports = Logger;