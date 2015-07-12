/**
 * Main Controller
 * @ngdoc controller 
 * @name MainController
 * @memberof controllers
 * @todo undocumented
 */
app.controller('MainController', function MainCntl(
    $scope, $rootScope, Application, Strings) {
    
    console.log("Main Controller Instantiated");
    
    // Store constants that need to be access from HTML templates on the global scope ($rootScope)
    $rootScope.Strings = Strings;
    
    /**
     * Initialize the application 
     * @memberof controllers.MainController
     * @param {Object}  options                contains informations send from the server
     */
    $scope.init = function(options) {
        
        console.log("Main Controller Init");
        
        Application.initialize(options.debug);
    
    };
});