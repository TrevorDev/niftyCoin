app.model.user = {
	create: function(guestId){
		return app.ajax({
			type: "POST",
			url: "/api/user",
			data: {guestId: guestId}
		})
	},
	sendCoins: function(toId, amt){
		return app.ajax({
			type: "POST",
	        url: "/api/user/"+toId+"/send/coins",
	        data: {coins: amt}
		})
	},
	show: function(id){
		return app.ajax({
			url: "/api/user/"+localStorage.userId+"/show"
		})
	},
	requestDailyBonus: function(){
		return app.ajax({
			type: "POST",
			url: "/api/user/requestDailyBonus"
		})
	}
}