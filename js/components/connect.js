import React from "react";
import ConnectedStore from "./ConnectedStore";
function connect(store,...items) {
  return (klass) => {

    // 计算 klassReplacement
      let ViewComponent = klass;
 
	  
	  class ConnectedViewComponent extends React.Component{
	  	render(){
	  		return (<ConnectedStore  store={store} propNames={items}>
	  					{propValues =>  <ViewComponent {...propValues} {...this.props}/>}
	  			   </ConnectedStore>);
	  	}
	  }
	  let klassReplacement=ConnectedViewComponent;
    return klassReplacement;
  };
}
module.exports=connect;