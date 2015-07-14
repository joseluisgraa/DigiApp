/**
 * System constants that need to be access on the whole application
 * @ngdoc constant 
 * @name SysConstants
 * @memberof constants
 */
app.constant('SysConstants', (function() {
	
    // Documented below as a public member
    var appserverBaseUrl = "http://localhost/training/testDigiApp";
    
    return {
		
        /**
         * The relative base URL of the application
         * @memberof constants.SysConstants
         * @constant 
         * @type {string}
         */
		appserverBaseUrl: appserverBaseUrl
    }
	

})());
