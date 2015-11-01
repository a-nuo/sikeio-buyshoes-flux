const React = require("react");
const QuantityControl = require("./QuantityControl");
const {cartItems,products} = require("../data");



/*引入Action*/
const CartStore = require("../stores/CartStore");
const LikeStore = require("../stores/LikeStore");
const ProductStore = require("../stores/ProductStore");
const ConnectedStore = require("./ConnectedStore");
//第二种方式
const MakeConnectedComponent = require("./MakeConnectedComponent");
//第三种方式
const connect = require("./connect");

module.exports = ConnectedProducts;

const {addCartItem} = CartStore;
const {addLikeItem} = LikeStore;
let Product = React.createClass({
  render() {
    let {id,name,price,imagePath} = this.props.product;
    let {cartItems,likeItems} = this.props//CartStore.getCartItems();
    let item = cartItems[id];
    //let likeItem = LikeStore.getLikeItems()[id];

    let productControl;
    if(item != null) {
      let {quantity} = item;
      productControl = (
        <QuantityControl item={item} variant="gray"/>
      );

    } else {
      productControl = (
        <a className="product__add" onClick={addCartItem.bind(this,id)}>
          <img className="product__add__icon" src="img/cart-icon.svg" />
        </a>
      );
    }

    //是否为喜欢产品
    let productHeartImg = likeItems[id]?("img/heart-liked.svg"):("img/heart.svg") ;
    return (
      <div className="product">

        <div className="product__display">
          <div className="product__img-wrapper">
            <img className="product__img" src={imagePath} />
          </div>

          <div className="product__control">
            {productControl}
          </div>

          <div className="product__price">
            {"$"+price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <img className="product__heart" src={productHeartImg} onClick={addLikeItem.bind(this,id)}/>
        </div>
      </div>
    );
  }
});

let Products = React.createClass({
  renderProducts() {
     //let products = 
    let {cartItems,likeItems,filteredProducts}=this.props;
    let productViews = Object.keys(filteredProducts).map(id => {
      let product = products[id];
      return (
        <Product key={id} product={product} cartItems={cartItems} likeItems={likeItems}/>
      );
    });

    return productViews;
  },

  render() {
    return (
      <div ref="products" className="products">
        {this.renderProducts()}
      </div>
    );
  },
});

/*class ConnectedProducts extends  React.Component{
    render(){

      return <ConnectedStore store={CartStore} propNames={["cartItems"]}>
              {propsOfStore1 => {
                return (
                  <ConnectedStore store={LikeStore} propNames={["likeItems"]} >
                    {propsOfStore2 => {
                      return <Products {...propsOfStore1} {...propsOfStore2}/>;
                    }}
                  </ConnectedStore>
                )
              }}
            </ConnectedStore>
    }
}*/
/** 第二种方式
module.exports = MakeConnectedComponent(
    MakeConnectedComponent(Products,CartStore,"cartItems"),
    LikeStore,"likeItems");;*/

//第三种方式
@connect(CartStore,"cartItems")
@connect(LikeStore,"likeItems")
@connect(ProductStore,"filteredProducts")
class ConnectedProducts extends Products {};

module.exports = ConnectedProducts;
