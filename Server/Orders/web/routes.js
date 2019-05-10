'use strict';

const routeHandler = require('./../handlers/route-handler');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
		this.app.post('/getCart', routeHandler.fetchCartHandler);
		this.app.post('/order', routeHandler.placeOrderHandler);
		this.app.post('/getOrders', routeHandler.getOrdersHandler);
		this.app.post('/order/:orderID', routeHandler.orderDetailsHandler);
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;