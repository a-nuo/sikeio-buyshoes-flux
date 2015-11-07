const React = require("react");
const {toggleShowOnlyLike} = require("../stores/ProductStore");
const connect = require("./connect");
const ProductStore = require("../stores/ProductStore");
class SiteTitle extends  React.Component{
  render() {
	let {showOnlyLike} = this.props;
	let src="img/heart.svg";
	if(showOnlyLike){
		src="img/heart-liked.svg";
	}
    return (
      <div className="title">
        <h2>Buy Me Shoes</h2>
        <img className="title__heart" src={src}  onClick={toggleShowOnlyLike.bind(this)}/>
      </div>
    );
  }
}

@connect(ProductStore,"showOnlyLike")
class ConnectedSiteTitle extends SiteTitle{}

module.exports = ConnectedSiteTitle;