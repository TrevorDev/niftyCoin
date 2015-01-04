app.model.stock = {
	getAllCurrent: function(id){
		return app.ajax({
			url: "/api/stock"
		})
	}
}