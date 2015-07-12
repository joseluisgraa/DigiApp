/**
 * Service that initialize our digitising application
 * @ngdoc service 
 * @name Application
 * @memberof services
 * @listens constants.Events#layersLoaded
 * @listens constants.Events#layersRefreshed
 * @listens constants.Events#configurationLoaded
 */
app.service('Application', function($rootScope, Log, ConfigurationManager, Events) {
    
    console.log("Application Service Instantiated");
    
    /**
     * Function: setupLibraries
     * Initialize some libraries constants needed on the application
     * @memberof services.Application
     */ 
	var setupLibraries = function(){
		
	    // Projection definition
	    Proj4js.defs["EPSG:27700"] = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";
	    Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
	    
	    // DPI for scales
	    OpenLayers.DOTS_PER_INCH = 90;
	    
	    // Setup manually OL image path because the minified file is not aware of its location
	    OpenLayers.ImgPath = SysConstants.appserverBaseUrl + "/resources/js/digitising/libs/openlayers_2.13.1/img/";
	};
    
    return {
    	
    	/**
         * Function: initialize
         * 
         * Initialize the application
         * @param {boolean} debug define if we are on debug mode
         * @memberof services.Application
         */
    	initialize: function(debug){
            
            console.log("Initialize function in Application Service");
            console.log("Debug Mode = " + app.globals.debug);
            
            // Load right level of log into the application
        	if (app.globals.debug == true){    	
        		Log.setLevel(Log.LEVELS_LIST.DEBUG);
        	}
        	else{
        		Log.setLevel(Log.LEVELS_LIST.ERROR);
        	}
            Log.debug("Log Initialized, level: " + Log.getLevel());
            
            // Load configuration
            ConfigurationManager.loadConfiguration();
            
            // We have to wait until the end of configuration
            $rootScope.$on(Events.configurationLoaded, function() {
            	Log.debug($rootScope.Strings.mapLoadedMessage);
            });                  
            
            }
    	}
    });