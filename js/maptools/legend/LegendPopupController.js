/**
 * Controller: LegendPopupController
 * View controller to display the legend for selected layer in layers switcher
 * 
 */
app.controller('LegendPopupController', function($scope, layerInfo, legend) {
	
    $scope.layerInfo = layerInfo;
    $scope.legend = legend;
});