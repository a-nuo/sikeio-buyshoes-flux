import EventEmitter from "events";
import AppDispatcher from "../components/AppDispatcher";
import CartStore from "./CartStore";
import  _ from 'lodash';
let emitter = new EventEmitter();
function emitChange(){
	emitter.emit("change");
}
// cartItem 的数组
let history = [];
let undoToken = AppDispatcher.register((action)=>{
	if("addCartItem" ==action.type ||"removeCartItem" == action.type){
		history.push(_.cloneDeep(CartStore.cartItems()));
		emitChange();
	}
	if("undoShoppingCart"==action.type){
		delete history.pop();
		emitChange();
	}
});


export default {
	lastHistoryItem(){
		if(history.length){
        	return history[history.length-1];
   		 }
	},
	undoToken:undoToken,
	addChangeListener(callback){
		emitter.addListener("change",callback);
	},
	removeChangeListener(callback){
		emitter.removeListener("change",callback);
	}
}