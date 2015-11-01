import React from "react";
const ConnectedStore = require("./ConnectedStore");
function MakeConnectedComponent(ViewComponent,Store,...propNames) {
 
  class ConnectedViewComponent extends React.Component{
  	render(){
  		return (<ConnectedStore  store={Store} propNames={propNames}>
  					{propValues =>  <ViewComponent {...propValues} {...this.props}/>}
  			   </ConnectedStore>);
  	}
  }

  return ConnectedViewComponent;
}

module.exports = MakeConnectedComponent;
