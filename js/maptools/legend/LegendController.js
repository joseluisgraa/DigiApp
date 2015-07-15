/**
 * Controller: LegendController
 * Handles the button states and actions for undoing/redoing
 * 
 */
app.controller('LegendController', function($scope, Log, LegendService) {
	
    Log.debug("Legend Controller instantiated.");
    
    
    $scope.onLegendButtonClick = function(){
        LegendService.logClick();
    };   

	$scope.controllerChangeFunction = function(){
		//MyService.doOtherAction();
    };


});