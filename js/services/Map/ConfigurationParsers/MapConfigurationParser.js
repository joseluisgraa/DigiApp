/**
 * Service creating map from the configuration
 * @ngdoc service
 * @name MapConfigurationParser
 * @memberof services.map.configurationParsers
 */
app.service('MapConfigurationParser', function($rootScope, Log, MapService) {
	
    Log.debug("Map Configuration Parser Instantiated");
    

    /**
     * Creates the map object from the given configuration
     * @memberof services.map.configurationParsers.MapConfigurationParser
     * @param {string} divName the HTML div id to use for the map
     * @param {Object} mapConf the configuration object to build the map from 
     */
    this.createMapFromConfiguration = function(divName, mapConf) {

        var options = {};

        assignProperty(mapConf, options, "projection");
        assignProperty(mapConf, options, "maxExtent");
        assignProperty(mapConf, options, "restrictedExtent");
        assignProperty(mapConf, options, "units");
        assignProperty(mapConf, options, "allOverlays");

        // The events on the map will be transmitted to the document
        options.fallThrough = true;
        
        // We already load the OL theme in our jsp. Do not try to load it a second time
        options.theme = false;

        if (mapConf.tileSize) {
            options.tileSize = new OpenLayers.Size(mapConf.tileSize, mapConf.tileSize);
        }
        assignProperty(mapConf, options, "resolutions");
        
        // Be sure to not have any default control on the map
        options.controls = [];
        
        // Create the OL map
        createMapFromOptions(divName, options);
        
        Log.debug("Map created");
    };
    
    var createMapFromOptions = function(divName, mapOptions){
    	    	
    	// Create an OpenLayers instance of a Map
    	var map = new OpenLayers.Map(divName, mapOptions);
    	
        // This fixes the event when the user zooms out fast (zoom level jump) 
        // which apparently does't get caught by zoomTo
        map.zoomToProxy = map.zoomTo;
        map.zoomTo = function(zoom, xy) {
            if (this.zoom >= zoom && zoom <= 9) {
                //just do nothing
            } else {
                map.zoomToProxy.apply(this, arguments);
            }
        };
        map.moveToProxy = map.moveTo;
        map.moveTo = function(lonlat, zoom) {
            if (this.zoom >= zoom && zoom <= 9) {
                //just do nothing
            } else {
                map.moveToProxy.apply(this, arguments);
            }
        };
        
        // Store the map into the MapService
        MapService.map = map;
    };
    
    /**
     * Creates the given property in the given options object, using the value
     * from the conf if it is defined.
     * @memberof services.map.configurationParsers.MapConfigurationParser
     * @param conf {Object} the configuration to parse
     * @param options {Object} the object to create the property into
     * @param property {string} the property to create in options from conf
     */
    var assignProperty = function(conf, options, property) {
        if (conf[property] !== undefined && conf[property] !== null) {
            options[property] = conf[property];
        }
    };

});