/**
 * 
 */
class Logger {

    constructor() {
        this.silent = false;
    }

    //-------------------------------------------------------------------------

    static getInstance() {
        if (Logger.instance) {
            return Logger.instance;
        }

        Logger.instance = new this();
        return Logger.instance;
    }

    //-------------------------------------------------------------------------

    setSilent() {
        this.silent = true;
    }
    
    //-------------------------------------------------------------------------

    /**
     * Error log
     * @param {Error} s 
     */
    e(s) {
        if (this.silent) {
            return;
        }

        console.log('\x1b[31m%s\x1b[0m', s);
    }

    //-------------------------------------------------------------------------

    /**
     * Fatal log (error + exit)
     * @param {*} s 
     */
    fatal(s) {
        if (this.silent) {
            process.exit(1);
        }

        this.e(s);
        process.exit(1);
    }

    //-------------------------------------------------------------------------

    /**
     * Info log
     * @param {*} s 
     */
    i(s) {
        if (this.silent) {
            process.exit(1);
        }

        console.log('\x1b[36m%s\x1b[0m', s);
    }

    //-------------------------------------------------------------------------

    /**
     * Success log
     * @param {*} s 
     */
    s(s) {
        if (this.silent) {
            process.exit(1);
        }

        console.log('\x1b[32m%s\x1b[0m', s);
    }

    //-------------------------------------------------------------------------

    /**
     * Log
     * @param {*} s 
     */
    l(s) {
        if (this.silent) {
            process.exit(1);
        }

        console.log(s);
    }

}

module.exports = Logger;