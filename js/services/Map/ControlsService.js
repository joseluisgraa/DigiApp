/**
 * Control Service
 * @ngdoc service 
 * @name ControlsService
 * @memberof services.map
 * @fires constants.Events#zoomInEditRange
 * @fires constants.Events#zoomOffEditRange
 */
app.service('ControlsService', function($rootScope, Log, MapService, Events) {
        
        var zoomChanged = function (){
        	Log.debug("Zoom Changed");
        };
    
        
        return {
        	
            addControlsToMap: function(controlsConfiguration) {
            	
                var map = MapService.map;
//                
//            	angular.forEach(controlsConfiguration, function(value, key) {
//                    if (value.serviceName) {
//                        var service = InjectorService.get(value.serviceName);
//                        if (value.serviceOptions && service.init){
//                        	service.init(value.serviceOptions);
//                        }
//                    }
//                });
            	
                // Add a basic navigation control
                map.addControl(new OpenLayers.Control.MousePosition());
                
                // Send event to controls and manage shortcuts each time a zoom change occurs
                // Because it may be wanted in this case to deactivate some of application controls
                zoomChanged();
                map.events.register("zoomend", this, zoomChanged);
                Log.debug("Controls added");
            }
        };
    });