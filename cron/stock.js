var ItemType = require('./../model/itemType');
var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();
var co = require('co')

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 */1 * * * *',//every 1 minuite
  onTick: function() {
  	co(function*(){
  		console.log("tick")
  		//TODO: DO THIS IN 1 QUERY TO SPEED IT UP
  		var stocks = yield ItemType.getCurrentStocks()
  		for(var i in stocks){
  			var flux = 5;
  			var stock = stocks[i]
  			var change = Math.floor(Math.random()*flux)+Math.floor(Math.random()*flux)
  			if(Math.random()>0.505){
  				change = -change;
  			}
  			stock.price += change
  			if(stock.price<0){
  				stock.price = 0;
  				stock.status = ItemType.STATUS.DELETED
  			}
  			yield stock.save()
  		}
  	})    
  },
  start: false,
  timeZone: "America/Los_Angeles"
});
job.start();
console.log("blah")