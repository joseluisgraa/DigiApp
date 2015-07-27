/**
 * Controller: LegendController
 * Handles the button states and actions for undoing/redoing
 * 
 */
app.controller('LegendController', function($scope, $modal, Log, LegendService, MapService) {
	
    $scope.LEGEND_TEMPLATE_ID = "./js/maptools/legend/legend-popup.html";
    $scope.LEGEND_CONTROLLER = "LegendPopupController";
    $scope.items = ['item1', 'item2', 'item3'];
    
    var legendModal = null;
    
    Log.debug("Legend Controller instantiated.");
    

    $scope.displayLegendPopup = function(layerId, size) {
        
        Log.debug("Inside displayLegendPopup");
        
        var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: $scope.LEGEND_TEMPLATE_ID,
              controller: $scope.LEGEND_CONTROLLER,
              size: size,
              resolve: {
                items: function () {
                  return $scope.items;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              Log.info('Modal dismissed at: ' + new Date());
            });
          };

          $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
          };
        
//        var legend = MapService.getLayerById(layerId).legend;
//        var closeCallback = function() {
//            // on close, if the old modal is different from the new one
//            if (layerInfo !== legendModal.layerInfo) {
//                legendModal = null;
//                //open a new modal
//                $scope.displayLegendPopup(layerInfo, size, $scope.LEGEND_TEMPLATE_ID, $scope.LEGEND_CONTROLLER);
//            } else {
//                //else do nothing 
//                legendModal = null;
//            }
//        };
//
//        //if legend is defined and a popup does not already exists
//        if (legend !== undefined && legend !== null && legendModal === null) {
//            // creates the popup
//            legendModal = $modal.open({
//                templateUrl: $scope.LEGEND_TEMPLATE_ID,
//                controller: $scope.LEGEND_CONTROLLER,
//                size: size,
//                resolve: {
//                    legend: function() {
//                        return legend;
//                    }
//                }
//            });
//            // bind "on close" event
//            legendModal.result.then(closeCallback, closeCallback);
//        }
//        // if a popup exists, close it
//        else if (legendModal !== null) {
//            legendModal.close();
//        }
//
//    };


});