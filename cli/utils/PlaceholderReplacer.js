/**
 * 
 */
class PlaceholderReplacer {

    constructor() {}

    //-------------------------------------------------------------------------

    static getInstance() {
        if (PlaceholderReplacer.instance) {
            return PlaceholderReplacer.instance;
        }

        PlaceholderReplacer.instance = new this();
        return PlaceholderReplacer.instance;
    }

    //-------------------------------------------------------------------------

    setTest() {
        
    }

    //-------------------------------------------------------------------------

    replace(s) {
        console.log('\x1b[31m%s\x1b[0m', s);
    }

}

module.exports = PlaceholderReplacer;