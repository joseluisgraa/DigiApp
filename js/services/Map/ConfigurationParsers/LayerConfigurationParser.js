/**
 * Service creating layers from the configuration and adding them to the map
 * @ngdoc service
 * @name LayerConfigurationParser
 * @memberof services.map.configurationParsers
 */
app.service('LayerConfigurationParser', function(Log, Strings, MapService) {

    Log.debug("Layer Configuration Parser Instantiated");
    

    /**
     * Creates a WMS layer from the configuration and adds it to the map
     *
     * @private
     * @memberof services.map.configurationParsers.LayerConfigurationParser
     * @param conf {Object} the layer configuration
     * @throws {ERR_INVALID_WMS_CONF} when the configuration is missing mandatory entries
     */
    var createWMS = function(conf) {

        var params = {};

        params.layers = conf.layers;
        assignProperty(conf, params, "format");
        assignProperty(conf, params, "transparent");
        assignProperty(conf, params, "tiled");
        if (conf.tiled) {
            params.tilesOrigin = MapService.map.maxExtent.left + "," + MapService.map.maxExtent.bottom;
        }
        
        Log.debug("Layer Params:")
        Log.debug(params);

        var options = {};
        assignProperty(conf, options, "isTraceable");
        assignProperty(conf, options, "hasShowVerticesOption");
        assignProperty(conf, options, "maxExtent");
        assignProperty(conf, options, "resolutions");
        assignProperty(conf, options, "projection");
        assignProperty(conf, options, "transitionEffect");
        assignProperty(conf, options, "isBaseLayer");
        assignProperty(conf, options, "displayInLayerSwitcher");
        assignProperty(conf, options, "visibility");
        assignProperty(conf, options, "opacity");
        assignProperty(conf, options, "queryable");
        assignProperty(conf, options, "usedForCopy");
        assignProperty(conf, options, "singleTile");
        assignProperty(conf, options, "buffer");
        assignProperty(conf, options, "layerGroup");
        assignProperty(conf, options, "layerId");
        assignProperty(conf, options, "filterConf");
        assignProperty(conf, options, "wfsURL");
        assignProperty(conf, options, "wfsLayerName");
        assignProperty(conf, options, "queryLayerID");
        assignProperty(conf, options, "parentQueryLayerID");
        assignProperty(conf, options, "minScale");
        assignProperty(conf, options, "maxScale");
        
        Log.debug("Layer Options:")
        Log.debug(options);
        
        var layer = new OpenLayers.Layer.WMS(conf.name, conf.url, params, options)

        MapService.map.addLayer(layer);

        if (options.isBaseLayer) {
            MapService.map.setBaseLayer(layer);
        }
        
        MapService.map.zoomToMaxExtent();

        Log.debug("WMS layer created");
    };


    /**
     * Creates the given property in the given options object, using the value
     * from the conf if it is defined.
     *
     * @private
     * @memberof services.map.configurationParsers.LayerConfigurationParser
     * @param {Object} conf the configuration to parse
     * @param {Object} options the object to create the property into
     * @param {string} property the property to create in options from conf
     */
    var assignProperty = function(conf, options, property) {
        if (conf[property] !== undefined && conf[property] !== null) {
            options[property] = conf[property];
        }
    };


    var LayerConfigurationParser = {

        /**
         * Parses the app configuration and creates layer accordingly
         *
         * @memberof services.map.configurationParsers.LayerConfigurationParser
         * @throws {Object} if mandatory properties are missing
         */
        createLayersFromConfiguration: function(readOnlyLayersConf) {
            //readOnlyLayersConf = readOnlyLayersConf.mergeSort(sortLayersByIndex);
            try {
                for (var i = 0; i < readOnlyLayersConf.length; i++) {
                    switch (readOnlyLayersConf[i].type) {
                        case "WMS":
                            createWMS(readOnlyLayersConf[i]);
                            break;
                    }
                }
            } catch (err) {
                var message = err.message || err;
                Log.error(message);
                throw err;
            }
        }
    };

    return LayerConfigurationParser;
});