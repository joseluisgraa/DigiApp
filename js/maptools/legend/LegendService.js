/**
 * Service for LegendController
 */
app.service('LegendService', function($rootScope, MapService, Log, Events) {

    Log.debug("Legend Service instantiated.");
    
    var function1 = function (){
        	Log.debug("Function 1");
    };


    return {

        logClick: function() {
            
            Log.info("onLegendButtonClick CLICK!");
            
            function1();
            
        }
    };

});