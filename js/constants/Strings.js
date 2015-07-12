/**
 * Strings of the whole digitising application
 * @ngdoc service 
 * @name Strings
 * @memberof constants
 */
app.service('Strings', function($sce) {
	
    return {
        
        mapLoadedMessage: "Map has been loaded",
        
        //Select
        selectButtonLabel: "Select",
        //Add
        createButtonLabel: "Create"
    };
});