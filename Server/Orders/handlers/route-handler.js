const queryHandler = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

'use strict';
class RouteHandler{

	constructor(){}

	async fetchCartHandler(request, response){
		const id = request.body.id;
		const cartItems = request.body.cartItems;		
		try {
			const messagesResponse = await queryHandler.fetchCart(id, cartItems);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				cartItems : messagesResponse.cart,
			});
		} catch ( error ){
			console.log(error);
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				cartItems: []
			});
		}
	}

	async placeOrderHandler(request, response){
		const id = request.body.id;
		const cartItems = request.body.cartItems;	
		const totalPrice = request.body.totalPrice;	
		try {
			const messagesResponse = await queryHandler.placeOrder(id, cartItems, totalPrice);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				orderStatus: messagesResponse.orderStatus
			});
		} catch ( error ){
			console.log(error);
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				orderStatus: 'Unplaced'
			});
		}
	} 

	async getOrdersHandler(request, response){
		const id = request.body.id;
		try {
			const messagesResponse = await queryHandler.getOrders(id);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				orders : messagesResponse.orders,
			});
		} catch ( error ){
			console.log(error);
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				orders: []
			});
		}
	}

	async orderDetailsHandler(request, response){
		const orderID = request.params.orderID;
		const userID = request.body.userID;
		try {
			const messagesResponse = await queryHandler.orderDetails(userID, orderID);
			console.log(messagesResponse[0]);
			response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
				error : false,
				orderDetails : messagesResponse[0],
			});
		} catch ( error ){
			console.log(error);
			response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
				error : true,
				message:CONSTANTS.SERVER_ERROR_MESSAGE,
				orderDetails: {},
			});
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
