const React = require("react");
/*引入Action*/
const CartStore = require("../stores/CartStore");
const {updateCartItemQuantity} = CartStore;
let QuantityControl = React.createClass({
  render() {
    let {variant} = this.props;
    let {id,quantity} = this.props.item;

    let className = "adjust-qty";
    if(variant === "gray") {
      className = "adjust-qty adjust-qty--gray";
    }

    return (
      <div className={className}>
        <a className="adjust-qty__button" onClick={updateCartItemQuantity.bind(this,id,(quantity-1))}>-</a>
        <div className="adjust-qty__number">{quantity}</div>
        <a className="adjust-qty__button" onClick={updateCartItemQuantity.bind(this,id,(quantity+1))}>+</a>
      </div>
    );
  }
});

module.exports = QuantityControl;