/**
 * Map Service
 * @ngdoc service
 * @name MapService
 * @memberof services.map
 * @fires constants.Events#sketchingChanged
 */
app.service('MapService', function($rootScope, Log, Events) {

    Log.debug("Map Service Instantiated");
    
    /**
     * The OpenLayers map
     * @private
     * @memberof services.map.MapService
     * @type {OpenLayers.Map}
     */
    var map = null;
    
    
    var MapService = {

        /**
         * The map object of the application
         * @memberof services.map.MapService
         * @type {OpenLayers.Map}
         */
        map: map,

        /**
         * Returns the layer which corresponds to the given layerId
         * @memberof services.map.MapService
         * @param   {string} layerId the layerId of the layer
         * @returns {OpenLayers.Layer} the corresponding layer, or undefined if no layer exists with the given layerId
         */
        getLayerById: function(layerId) {
            Log.debug("Get Layer by ID");
            return this.map.getLayersBy("layerId", layerId)[0];
        }
    };
    
    return MapService;
});