/**
 * Handles the application's configuration
 * @ngdoc service 
 * @name ConfigurationManager
 * @memberof services
 * @fires constants.Events#configurationLoaded
 */
app.service('ConfigurationManager', function($rootScope, Log, MapConfigurationParser, LayerInitService, MapService, Events, ControlsService) {

    /**
     * retrieve the role configuration
     * @memberof services.ConfigurationManager
     */
    function loadConfig() {
		
        var configPromise = $.getJSON("./js/config/config.json");
        
        Log.debug("Started to load config.json");
        
        configPromise.fail(function(){
            Log.debug("error loading config.json");
        });

        configPromise.done(function(data){
            
            Log.debug("config.json loaded");  
            
            console.time("Time to Load Map -Logged with console-");
            Log.time("Time to Load Map -Logged with Log Service-"); 
			
			// Retrieve services from configuration
            var services = data.services;

            // Proxy to use by OpenLayers
            OpenLayers.ProxyHost = services.proxyHost;
            
            MapConfigurationParser.createMapFromConfiguration('map', data.map);             
            LayerInitService.addLayersToMap(data.layers);
            MapService.map.zoomToExtent(data.map.maxExtent);
    		ControlsService.addControlsToMap(data.controls);
            
            console.timeEnd("Time to Load Map -Logged with console-");
            Log.timeEnd("Time to Load Map -Logged with Log Service-");
    		
    		$rootScope.$broadcast(Events.configurationLoaded, this);

        });
    }
    

    return {
        /**
         * retrieves the current configuration for the job
	     * @memberof services.ConfigurationManager
         */
        loadConfiguration: function () {
        	loadConfig();
        }
    };
});