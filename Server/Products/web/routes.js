'use strict';

const routeHandler = require('./../handlers/route-handler');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){
		this.app.get('/searchProduct/:searchterm', routeHandler.searchProductHandler);

		this.app.post('/products/:pageNo', routeHandler.productsHandler);

		this.app.get('/filterData', routeHandler.filterDataHandler);

		this.app.get('/productDetails/:id', routeHandler.productDetailsHandler);

		this.app.get('*', routeHandler.routeNotFoundHandler);		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;