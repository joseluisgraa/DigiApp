/**
 * Match the log call to console
 * @ngdoc service
 * @name Log
 * @memberof services
 */
app.service('Log', function() {
	
    /**
     * Maximum level of error to print 
     * @memberof services.Log
     * @private
     * @type {services.Log.LEVELS_LIST}
     */
    var currentLevel = 99;
    
    return {
    	
    	/**
    	 * Enum of available log levels
         * @memberof services.Log
         * @enum {number}
    	 */
    	LEVELS_LIST: {
			ERROR: 0,
		    WARN: 1,
		    INFO: 2,
		    VERBOSE: 3,
		    DEBUG: 4
    	},
    	
    	/**
    	 * Set the level to use
    	 * @param {services.Log.LEVELS_LIST} level the level to use
         * @memberof services.Log
    	 */
    	setLevel: function(level){
    		currentLevel = level;
    	},
        
        /**
    	 * Set the level to use
    	 * @param {services.Log.LEVELS_LIST} level the level to use
         * @memberof services.Log
    	 */
    	getLevel: function(){
    		return currentLevel;
    	},
    	
        /**
         * log to ERROR level
         * @param {string} msg msg to log
         * @memberof services.Log
         */
        error: function(msg) {
            if (currentLevel >= this.LEVELS_LIST.ERROR && window.console && console.error) {
                console.error(msg);
            }
        },

        /**
         * log to WARN level
         * @param {string} msg msg to log
         * @memberof services.Log
         */
        warning: function(msg) {
            if (currentLevel >= this.LEVELS_LIST.WARN && window.console && console.warn) {
                console.warn(msg);
            }
        },

        /**
         * log to INFO level
         * @memberof services.Log
         * @param {string} msg msg to log
         */
        info: function(msg) {
            if (currentLevel >= this.LEVELS_LIST.INFO && window.console && console.info) {
                console.info(msg);
            }
        },

        /**
         * log to DEBUG level
         * @param {string} msg msg to log
         * @memberof services.Log
         */
        debug: function(msg) {
            if (currentLevel >= this.LEVELS_LIST.DEBUG && window.console && console.info) {
                //Log as info because console.debug doesn't exist in IE
                console.info(msg);
            }
        },

        /**
         * log to VERBOSE level
         * @param {string} msg msg to log
         * @memberof services.Log
         */
        verbose: function(msg) {
            if (currentLevel >= this.LEVELS_LIST.VERBOSE && window.console && console.log) {
                console.log(msg);
            }
        },

        /**
         * starts timer (DEBUG level)
         * @param {string} timerName the timer name
         * @memberof services.Log
         */
        time: function(timerName) {
            if (currentLevel >= this.LEVELS_LIST.DEBUG && window.console && console.info) {
                if (!timerName) {
                    return;
                }
                var time = new Date().getTime();
                if (!console.timeCounters) {
                    console.timeCounters = {};
                }
                var key = "KEY" + timerName.toString();
                if (console.timeCounters[key]) {
                    return;
                }
                console.timeCounters[key] = time;

            }
        },

        /**
         * ends timer (DEBUG level)
         * @param {string} timerName the timer name
         * @memberof services.Log
         */
        timeEnd: function(timerName) {
            if (currentLevel >= this.LEVELS_LIST.DEBUG && window.console && console.info) {
                var time = new Date().getTime();
                if (!console.timeCounters) {
                    return;
                }
                var key = "KEY" + timerName.toString();
                var timeCounter = console.timeCounters[key];
                var diff;
                if (timeCounter) {
                    diff = time - timeCounter;
                    var label = timerName + ": " + diff + "ms";
                    console.info(label);
                    delete console.timeCounters[key];
                }
                return diff;
            }
        }
    };
    
});