const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

'use strict';
class RouteHandler{

	constructor(){}

	async registrationHandler(request, response){
		const user = request.body.user;
		try {
			const messagesResponse = await queryHandler.register(user);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				registered : messagesResponse.registered,
				loggedIn: messagesResponse.loggedIn
			});
			console.log('resolved');
		} catch ( error ){
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				registered : false,
				loggedIn: false
			});
			console.log(error);
		}
	}

	async logoutHandler(request, response){
		const id = request.body.id;
		try {
			const messagesResponse = await queryHandler.logout(id);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				loggedOut: true
			});
			console.log('resolved');
		} catch ( error ){
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				registered : false,
				loggedIn: false
			});
			console.log(error);
		}
	}

	async loginHandler(request, response){
		console.log('Route Handler');
		const email = request.body.user.email;
		const password = request.body.user.password;
		if (email === '' || password === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USER_LOGIN_FAILED
			});
		} else {
			try {
				const messagesResponse = await queryHandler.account(email,password);
				console.log('--------------------');
				console.log(messagesResponse);
				if(messagesResponse ===  null || messagesResponse === undefined) {
					response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
						error : true,
						message : CONSTANTS.USER_LOGIN_FAILED
					});
				} else {
					await queryHandler.makeUserOnline(messagesResponse._id);
					response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
						error : false,
						id : messagesResponse._id,
						loggedIn: true
					});
				}
			} catch ( error ){
				console.log(error);
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					account : [],
					loggedIn: false
				});
			}

		}
	}

	async emailAvailableHandler(request, response){
		const email = request.body.email;
		if (email === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.ROUTE_NOT_FOUND,
				emailAvailable: false
			});
		} else {
			try {
				const messagesResponse = await queryHandler.emailAvailable(email);
				if(messagesResponse <= 0) {
					response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
						error : false,
						emailAvailable: true
					});
				} else {
					response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
						error : false,
						emailAvailable: false
					});
				}
			} catch ( error ){
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					emailAvailable: true
				});
			}
		}
	}

	async profileHandler(request, response){
		const id = request.body.id;
		console.log(`ID to check is ${id}`);
		if (id === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message: CONSTANTS.ROUTE_NOT_FOUND
			});
		} else {
			try {
				const messagesResponse = await queryHandler.profile(id);
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					user : messagesResponse.user,
				});
			} catch ( error ){
				console.log(error);
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					user : [],
				});
			}

		}
	}

	async editProfileHandler(request, response){
		const id = request.body.id;
		const user = request.body.user;
		if (id === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message: CONSTANTS.ROUTE_NOT_FOUND
			});
		} else {
			try {
				const messagesResponse = await queryHandler.editProfile(id, user);
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					updateStatus : messagesResponse.updateStatus,
				});
			} catch ( error ){
				console.log(error);
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					updateStatus : messageResponse.updateStatus,
				});
			}

		}
	}

	async userSessionCheckHandler(request, response){
		let currentUserID = request.body.currentUserID;
		if (currentUserID === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USERID_NOT_FOUND
			});
		} else {
			try {
				const result = await queryHandler.userSessionCheck({ currentUserID : currentUserID });
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					username : result.username,
					message : CONSTANTS.USER_LOGIN_OK
				});
			} catch(error) {
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					message : CONSTANTS.USER_NOT_LOGGED_IN
				});
			}
		}
	}

	routeNotFoundHandler(request, response){
		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
			error : true,
			message : CONSTANTS.ROUTE_NOT_FOUND
		});
	}
}

module.exports = new RouteHandler();
