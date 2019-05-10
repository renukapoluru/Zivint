'use strict';

const routeHandler = require('./../handlers/route-handler');

class Routes{

	constructor(app){
		this.app = app;
	}

	/* creating app Routes starts */
	appRoutes(){

		this.app.post('/login', routeHandler.loginHandler);
		this.app.post('/register', routeHandler.registrationHandler);
		this.app.post('/checkEmailAvailability', routeHandler.emailAvailableHandler);
		this.app.post('/profile', routeHandler.profileHandler);
		this.app.post('/edit-profile', routeHandler.editProfileHandler);
		this.app.post('/userSessionCheck', routeHandler.userSessionCheckHandler);
		this.app.post('/logout', routeHandler.logoutHandler);
		this.app.get('*', routeHandler.routeNotFoundHandler);		
		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;