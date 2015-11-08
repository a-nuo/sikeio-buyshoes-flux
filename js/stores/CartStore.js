
import AppDispatcher from "../components/AppDispatcher";
import EventEmitter from "events";
import UndoStore from "./UndoStore";

let emitter = new EventEmitter();

function emitChange(){
	emitter.emit("change");
}

let handlers = {
  // 私有的写 API。不要暴露这些函数！
  	addCartItem(action){
  		let {productId} = action;
		if(_cartItems[productId] ){
			_cartItems[productId].quantity+=1;
		} else {
			_cartItems[productId] = {id:productId,quantity:1};
		}
		emitChange();
	},
	removeCartItem(action) {
  		let {productId} = action;
		delete _cartItems[productId];
		emitChange();
	},
	/*更新购物车产品数量*/
	updateCartItemQuantity(action){
  		let {productId,quantity} = action;
		if(_cartItems[productId] && quantity>1){
			_cartItems[productId].quantity=quantity;
			emitChange();
		}
	},
	undoShoppingCart(action){
		let {cartItems} = action;
		if(cartItems){
			_cartItems = cartItems;
		}
		emitChange();
	}
};
// 监听 "action" 事件
AppDispatcher.register((action) => {
  
  //AppDispatcher.waitFor([UndoStore.undoToken]);
  let handler = handlers[action.type];
  // 如果 store 没有对应的句柄，忽略该 action
  handler && handler(action);
});



let _cartItems = {};
export default {

	getCartItems(){
		return _cartItems;
	},
	cartItems(){
		return _cartItems;
	},

	
	addChangeListener(callback){
		emitter.addListener("change",callback);
	},

	removeChangeListener(callback){
		emitter.removeListener("change",callback);
	}
}