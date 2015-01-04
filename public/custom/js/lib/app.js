var app = app || {}
app.model = app.model || {}

//created incase extra processing is needed to be done in the future may be able to replace this with just $.ajax
app.ajax = function(ajaxOptions){
	return $.Deferred(function( defer ) {
		var request = $.ajax(ajaxOptions);
		 
		request.done(function( data ) {
		  return defer.resolve(data)
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  return defer.reject(arguments)
		});
	})
}