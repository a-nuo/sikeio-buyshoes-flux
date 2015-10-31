const React = require("react");

const {cartItems,products} = require("../data");

/*引入Action*/
const CartStore = require("../stores/CartStore");
const ConnectedStore = require("./ConnectedStore");
const {updateCartItemQuantity} = CartStore;

let Checkout = React.createClass({

  componentDidMount() {
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },
  render() {
    let subtotal = 0;
    let cartItems = CartStore.getCartItems();
    Object.keys(cartItems).forEach(key => {
      let {quantity} = cartItems[key];
      let {price} = products[key];
      subtotal += price * quantity;
    });

    return (
      <div className="checkout">
        <hr className="checkout__divider" />

        <input type="text" className="checkout__coupon-input" placeholder="coupon code" />

        {/*
        <div className="checkout__line">
          <div className="checkout__line__label">
            Discount
          </div>
          <div className="checkout__line__amount">
            -$90
          </div>
        </div>
        */}

        <div className="checkout__line">
          <div className="checkout__line__label">
            Subtotal
          </div>
          <div className="checkout__line__amount">
            {`$${subtotal.toFixed(2)}`}
          </div>
        </div>

        <a className="checkout__button">
          <img className="checkout__button__icon" src="img/cart-icon.svg" />
          <div className="checkout__button__label">
            Checkout
          </div>
        </a>
      </div>
    );
  }
});

class ConnectedCart extends React.Component{

  render(){
    return <ConnectedStore store={CartStore} propNames={["cartItems"]}>
            {propValues => <Checkout {...propValues}/>}
          </ConnectedStore>

  }

}

module.exports = ConnectedCart;