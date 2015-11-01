const EventEmitter = require("events");
let emitter = new EventEmitter();

function emitChange(){
	emitter.emit("change");
}

let _likeItems = {};
module.exports = {

	getLikeItems(){
		return _likeItems;
	},
	likeItems(){
		return _likeItems;
	},
	/*Action start*/
	addLikeItem(productId){
		if(_likeItems[productId] ){
			delete _likeItems[productId];
		} else {
			_likeItems[productId] = {id:productId};
		}
		emitChange();
	},
	/*Action end*/
	addChangeListener(callback){
		emitter.addListener("change",callback);
	},

	removeChangeListener(callback){
		emitter.removeListener("change",callback);
	}
};