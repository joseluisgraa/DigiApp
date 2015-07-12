/**
 * Layer service
 * @ngdoc service 
 * @name LayersService
 * @memberof services.map
 * @fires constants.Events#layersLoaded
 * @fires constants.Events#layersRefreshed
 */
app.service('LayersService', function(LayerConfigurationParser, MapService, Log) {

    Log.debug("Layer Service Instantiated");
    
    var LayersService = {
    		
    	/**
    	 * Add all given layers retrieved from the configuration to the map
         * @memberof services.map.LayersService
    	 */
		addLayersToMap: function(layersConf) {

	        LayerConfigurationParser.createLayersFromConfiguration(layersConf);
	    }
    };
    
    return LayersService;
});