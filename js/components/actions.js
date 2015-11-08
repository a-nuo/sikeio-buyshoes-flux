import dispatcher from "./AppDispatcher";
import UndoStore from "../stores/UndoStore";
/*Action start*/
module.exports = {
	addCartItem(productId){

		dispatcher.dispatch({type:"addCartItem",productId:productId})
	},
	removeCartItem(productId) {

		dispatcher.dispatch({type:"removeCartItem",productId:productId});
	},
	/*更新购物车产品数量*/
	updateCartItemQuantity(productId,quantity){
		dispatcher.dispatch({type:"updateCartItemQuantity",productId:productId,quantity:quantity});
	},
	undoShoppingCart() {
	  let cartItems = UndoStore.lastHistoryItem();
	  dispatcher.dispatch({type: "undoShoppingCart", cartItems: cartItems});
	}	
}