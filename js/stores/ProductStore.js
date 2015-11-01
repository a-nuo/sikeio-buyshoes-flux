import {products} from "../data.js";
const LikeStore =require("./LikeStore");
const EventEmitter = require("events");
let emitter = new EventEmitter();

function emitChange(){
  emitter.emit("change");
}
// 现在先暂时硬编码，将 `_products` 和所有可用的商品关联起来。
let _products = products;

let _showOnlyLike = false;

module.exports = {
  // Reader 函数
  products() {
    // 返回所有的商品
    return _products;
  },


  filteredProducts() {
    // 根据 _showOnlyLike 筛选出过滤后的商品
    if(!_showOnlyLike){
      return this.products();
    }else {
      let filteredProducts ={};
      let likeItems = LikeStore.likeItems();
      for (let id in _products) {
        let item = _products[id];
        if(id in likeItems){
          filteredProducts[id]=item;
        }
      };
      console.log(filteredProducts);
      return filteredProducts;
    }
  },
  showOnlyLike(){
    return _showOnlyLike;
  },
  // 行为
  toggleShowOnlyLike() {
    _showOnlyLike=!_showOnlyLike;
    console.log(_showOnlyLike);
    emitChange();
  },

  addChangeListener(callback){
    emitter.addListener("change",callback);
  },

  removeChangeListener(callback){
    emitter.removeListener("change",callback);
  }
}
