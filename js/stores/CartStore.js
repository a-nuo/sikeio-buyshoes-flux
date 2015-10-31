const EventEmitter = require("events");
let emitter = new EventEmitter();

function emitChange(){
	emitter.emit("change");
}

let _cartItems = {};
module.exports = {

	getCartItems(){
		return _cartItems;
	},
	cartItems(){
		return _cartItems;
	},
	/*Action start*/
	addCartItem(productId){
		if(_cartItems[productId] ){
			_cartItems[productId].quantity+=1;
		} else {
			_cartItems[productId] = {id:productId,quantity:1};
		}
		emitChange();
	},
	removeCartItem(productId) {
		delete _cartItems[productId];
		emitChange();
	},
	/*更新购物车产品数量*/
	updateCartItemQuantity(productId,quantity){
		if(_cartItems[productId] && quantity>1){
			_cartItems[productId].quantity=quantity;
			emitChange();
		}
	},
	/*Action end*/
	addChangeListener(callback){
		emitter.addListener("change",callback);
	},

	removeChangeListener(callback){
		emitter.removeListener("change",callback);
	}
};