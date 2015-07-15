/**
 * Layer service
 * @ngdoc service 
 * @name LayerInitService
 * @memberof services.map
 * @fires constants.Events#layersLoaded
 * @fires constants.Events#layersRefreshed
 */
app.service('LayerInitService', function(LayerConfigurationParser, MapService, Log) {

    Log.debug("Layer Init Service Instantiated");
    
    var LayerInitService = {
    		
    	/**
    	 * Add all given layers retrieved from the configuration to the map
         * @memberof services.map.LayerInitService
    	 */
		addLayersToMap: function(layersConf) {

	        LayerConfigurationParser.createLayersFromConfiguration(layersConf);
	    }
    };
    
    return LayerInitService;
});